from flask import Flask, jsonify
import requests

URL = "http://169.254.169.254/latest"
TOKEN_FOR_6_HOURS = "21600"
app = Flask(__name__)


def get_instance_metadata():
    """Fetch instance metadata from AWS metadata service."""
    try:
        # Step 1: Get a session token for IMDSv2
        token = requests.put(
            f"{URL}/api/token",
            headers={"X-aws-ec2-metadata-token-ttl-seconds": TOKEN_FOR_6_HOURS}
        ).text

        # Step 2: Use the token to fetch metadata
        metadata_url = f"{URL}/latest/meta-data/"
        az = requests.get(
            metadata_url + "placement/availability-zone",
            headers={"X-aws-ec2-metadata-token": token}
        ).text
        region = az[:-1]

        return {"region": region, "availabilityZone": az}
    except Exception as e:
        print(e)
        return {"message": "Not Found"}


@app.route("/api/location")
def get_location():
    """Return the region and availability zone."""
    metadata = get_instance_metadata()
    return jsonify(metadata)


if __name__ == "__main__":
    app.run()