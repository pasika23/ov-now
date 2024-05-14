##### this is a proxy with caching
# you need to (pip / conda) install fastAPI, fastapi-cache, pydantic, requests, uvicorn

#definine key, can be swaped if credits are used up
key="5cc87b12d7c5370001c1d65576ce5bd4be5a4a349ca401cdd7cac1ff"

from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel
import requests
from functools import lru_cache
from fastapi import Body

app = FastAPI()

class BBox(BaseModel):
    min_lat: float
    min_lon: float
    max_lat: float
    max_lon: float

class TrainID(BaseModel):
    train_id: str

# Function to fetch GeoJSON data from the provided API link
@lru_cache(maxsize=128)
def fetch_geojson_from_external_api(api_url, api_key):
    response = requests.get(api_url)
    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch GeoJSON data")

# Function to fetch Journeys data for a given train ID
@lru_cache(maxsize=128)
def fetch_journeys_for_train_id(train_id, key):
    api_url = f"https://api.geops.io/tracker-http/v1/journeys/{train_id}/?key={key}"
    return fetch_geojson_from_external_api(api_url, key)

# Endpoint to get trajectories and journey based on bounding box
@app.get("/get_all_journey/")
async def get_all_journey(bbox: BBox = Body(..., description="Bounding box coordinates"), key: str = Query(..., description="API key")):
    # Extract bounding box coordinates
    bbox_str = f"{bbox.min_lon},{bbox.min_lat},{bbox.max_lon},{bbox.max_lat}"
    
    # Construct API URL with dynamic bounding box and provided API key
    api_url = f"https://api.geops.io/tracker-http/v1/trajectories/sbb/?bbox={bbox_str}&key={key}"  # Adjust if necessary

    # Call external API to fetch GeoJSON data
    trajectories_geojson = fetch_geojson_from_external_api(api_url, key)

    # Get Journeys for each train ID in trajectories_geojson
    for feature in trajectories_geojson["features"]:
        train_id = feature["properties"]["train_id"]
        journeys_geojson = fetch_journeys_for_train_id(train_id, key)
        # Merge journeys_geojson into trajectories_geojson
        feature["properties"]["journeys"] = journeys_geojson["features"]

    # Return fetched GeoJSON data
    return trajectories_geojson

# Endpoint to get calls based on train ID
@app.get("/get_info/")
async def get_info(train_id: str = Query(..., description="Train ID"), key: str = Query(..., description="API key")):
    # Construct API URL with provided train ID and API key
    api_url = f"https://api.geops.io/tracker-http/v1/calls/{train_id}/?key={key}"  # Adjust if necessary

    # Call external API to fetch GeoJSON data
    calls_geojson = fetch_geojson_from_external_api(api_url, key)

    # Return fetched GeoJSON data
    return calls_geojson

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
