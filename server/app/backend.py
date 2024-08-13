from fastapi import FastAPI, Query, HTTPException, Request, Response
import requests
import logging
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Erlaubte Ursprünge (z.B. dein React-Frontend)
origins = [
    "http://localhost:3000",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Configure logging
logging.basicConfig(level=logging.INFO)

# GeoServer WMS endpoint
GEOSERVER_WMS_URL = "http://localhost:8080/geoserver/wms"
GEOSERVER_WFS_URL = "http://localhost:8080/geoserver/wfs"

@app.get("/wms")
async def get_wms_service(
    layers: str = Query(..., alias="LAYERS"),
    bbox: str = Query(..., alias="BBOX"),
    width: int = Query(..., alias="WIDTH"),
    height: int = Query(..., alias="HEIGHT"),
    srs: str = Query("EPSG:3857", alias="SRS"),
    format: str = Query("image/png", alias="FORMAT")
):
    # Construct query parameters for GeoServer WMS request
    query_params = {
        "service": "WMS",
        "version": "1.1.1",
        "request": "GetMap",
        "layers": layers,
        "bbox": bbox,
        "width": width,
        "height": height,
        "srs": srs,
        "format": format,
    }

    # Log the request details
    logging.info(f"Forwarding request to GeoServer with params: {query_params}")

    try:
        # Forward the request to GeoServer
        response = requests.get(GEOSERVER_WMS_URL, params=query_params)

        # Log GeoServer's response status
        logging.info(f"GeoServer response status: {response.status_code}")

        # If the response is successful, return the image content
        if response.status_code == 200:
            return Response(content=response.content, media_type="image/png")
        else:
            # Log the error details if the request failed
            logging.error(f"GeoServer returned an error: {response.status_code}, details: {response.text}")
            raise HTTPException(status_code=response.status_code, detail=f"Error retrieving data from GeoServer: {response.text}")

    except requests.RequestException as e:
        # Log the exception and raise an HTTPException if the request fails
        logging.error(f"GeoServer request failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"GeoServer request failed: {str(e)}")


@app.get("/wfs")
async def get_wfs_service(
    typename: str = Query(..., description=""),
    bbox: str = Query(None, description=""),
    srsname: str = Query("EPSG:3857", description=""),
    output_format: str = Query("application/json", description="")
):
    query_params = {
        "service": "WFS",
        "version": "1.0.0",
        "request": "GetFeature",
        "typename": typename,
        "srsname": srsname,
        "outputFormat": output_format,
    }

    if bbox:
        query_params["bbox"] = bbox

    logging.info(f"Forwarding WFS request to GeoServer with params: {query_params}")

    try:
        # Forward the request to GeoServer
        response = requests.get(GEOSERVER_WFS_URL, params=query_params)

        if response.status_code == 200:
            logging.info("GeoServer returned a successful WFS response.")
            return response.json()
        else:
            logging.error(f"GeoServer WFS returned an error: {response.status_code} - {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Error retrieving data from GeoServer")

    except requests.RequestException as e:
        logging.error(f"GeoServer WFS request failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"GeoServer request failed: {str(e)}")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
