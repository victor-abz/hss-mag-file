import os

import api_model
import pandas as pd
from fastapi import FastAPI, Response, status
from fastapi.responses import JSONResponse
from openpyxl import load_workbook

HOST = "127.0.0.1"
PORT = 7777

app = FastAPI()


@app.get("/hello/{name}")
def read_root(name: str):
    return f"hello {name}"


@app.post("/validate-hssmag/")
def open_explorer(model: api_model.PathModel, response: Response):

    try:
        # mifotra_data = pd.read_excel(
        #     model.path, sheet_name="HSS MAG", na_filter=False, engine="openpyxl"
        # )
        wb = load_workbook(model.path, read_only=True)  # open an Excel file and return a workbook
        if "HSS MAG" in wb.sheetnames:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED, content={"success": True, "msg": "Valid"}
            )
        else:
            raise Exception("Sheet called HSS MAG Should Exist in uploaded file")

        return JSONResponse(status_code=status.HTTP_201_CREATED, content="Worked")
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"success": False, "msg": str(e)},
        )


@app.post("/validate-ids/")
def validat_id(model: api_model.PathModel, response: Response):

    try:
        # mifotra_data = pd.read_excel(
        #     model.path, sheet_name="HSS MAG", na_filter=False, engine="openpyxl"
        # )
        adfinance_ids = pd.read_csv(model.path)
        if "idnumber" in adfinance_ids.columns and "num_complet_cpte" in adfinance_ids.columns:
            return JSONResponse(
                status_code=status.HTTP_201_CREATED, content={"success": True, "msg": "Valid"}
            )
        else:
            raise Exception("Sheet called HSS MAG Should Exist in uploaded file")

        return JSONResponse(status_code=status.HTTP_201_CREATED, content="Worked")
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"success": False, "msg": str(e)},
        )


if __name__ == "__main__":
    import asyncio

    import uvicorn

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    loop.run_until_complete(uvicorn.run("api:app", host=HOST, port=PORT, reload=True))
