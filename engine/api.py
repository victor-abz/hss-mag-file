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


@app.post("/open-explorer/")
def open_explorer(model: api_model.PathModel, response: Response):

    # os.startfile(model.path)
    # Match ID's and update Create a new COlumn with Account Nos
    # Update
    # try:
    mifotra_data = pd.read_excel(
        model.path, sheet_name="HSS MAG", na_filter=False, engine="openpyxl"
    )
    # raise 'Err'
    return JSONResponse(status_code=status.HTTP_201_CREATED, content="Worked")
    # except Exception as e:

    # return f"wb.sheetnames -------->{e}"


if __name__ == "__main__":
    import asyncio

    import uvicorn

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    loop.run_until_complete(uvicorn.run("api:app", host=HOST, port=PORT, reload=True))
