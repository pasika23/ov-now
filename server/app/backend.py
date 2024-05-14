from fastapi import FastAPI, HTTPException, Response, File
from fastapi.responses import JSONResponse
from starlette.responses import FileResponse
import os
import uvicorn
#import  #to call geoOps API / just do it with FastAPI???


##### this is a proxy with caching

#defining username and key



#call get_trajectories



#call get_journey for specific trainID


### calling geoOps API get_trajectories and for each train call get_journey
# maybe filter vehicle type so that only journey of trains are loaded


# call get_calls for specific trainID



#caching the results of the calls



# return the results of the calls to Frontend-calls:

app = FastAPI()

class BBox(BaseModel):
    min_lat: float
    min_lon: float
    max_lat: float
    max_lon: float

class TrainID(BaseModel):
    train_id: str

# Endpoint to give trajectories and journey based on bounding box
@app.get("/get_all_journey/")
async def get_all_journey(bbox: BBox):

    # Simulate processing or fetching GeoJSON files
    trajectories_geojson = "get_trajectories.json"
    journey_geojson = "get_journey.json"

    # Return paths to GeoJSON files
    return {
        "trajectories": f"/geojson/{trajectories_geojson}",
        "journey": f"/geojson/{journey_geojson}"
    }

# Endpoint to give calls based on train ID
@app.get("/get_info/")
async def get_info(train_id: str):

    # Simulate processing or fetching GeoJSON file
    calls_geojson = "get_calls.json"

    # Return path to GeoJSON file
    return {
        "calls": f"/geojson/{calls_geojson}"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)