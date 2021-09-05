from typing import Optional

from pydantic import BaseModel
from pydantic.schema import model_process_schema


class PathModel(BaseModel):
    path: str
    message: Optional[str]


class SubmitModel(BaseModel):
    hss_mag_file: str
    adfinance_file: str
    output_folder: str
