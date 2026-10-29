from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from datetime import date
from http import HTTPStatus
from uuid import uuid4, UUID as UUIDType

from sqlalchemy import UUID, Date, Float, String, create_engine, select
from sqlalchemy.orm import Mapped, mapped_column, sessionmaker
from sqlalchemy.orm import DeclarativeBase, Session
from fastapi.middleware.cors import CORSMiddleware

# Configuração do banco de dados e definição de modelo
engine = create_engine("sqlite:///gastos.db", echo=True)

session = sessionmaker(engine)

class Base(DeclarativeBase):
    pass

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

class Gasto(Base):
    __tablename__ = "gastos"

    id: Mapped[UUIDType] = mapped_column(UUID, primary_key=True, default=uuid4)
    nome: Mapped[str] = mapped_column(String(100), nullable=False)
    valor: Mapped[float] = mapped_column(Float, nullable=False)
    data: Mapped[date] = mapped_column(Date, nullable=False)


# Schemas Pydantic
class GastoEntrada(BaseModel):
    nome: str = Field(min_lenght=3)
    valor: float = Field(gt=0)
    data: date

class GastoSaida(GastoEntrada):
    id: UUIDType

app = FastAPI()

# configuração do CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# criando tabelas
Base.metadata.create_all(engine)


@app.post("/gastos", status_code=HTTPStatus.CREATED)
def adicionar_gastos(gasto: GastoEntrada, db: Session = Depends(get_db)) -> GastoSaida:
    g = Gasto(**gasto.model_dump())

    db.add(g)
    db.commit()
    
    return GastoSaida(id=g.id,nome=g.nome, valor=g.valor, data=g.data)


@app.get("/gastos")
def listar_gastos(db: Session = Depends(get_db)):
    stmt = select(Gasto)
    gastos = db.execute(stmt).scalars().all()

    return [{"ID": gasto.id ,"Nome": gasto.nome, "Valor": gasto.valor, "Data": gasto.data} for gasto in gastos]


@app.get("/gasto/{gasto_id}")
def obter_gasto(gasto_id:UUIDType, db: Session = Depends(get_db)) -> GastoSaida:
    stmt = select(Gasto).where(Gasto.id == gasto_id)
    gasto = db.execute(stmt).scalar_one_or_none()

    if not gasto:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Gasto não encontrado")

    return GastoSaida(id=gasto.id,nome=gasto.nome, valor=gasto.valor, data=gasto.data)

@app.delete("/gasto/{gasto_id}", status_code=HTTPStatus.NO_CONTENT)
def deletar_gasto(gasto_id:UUIDType, db: Session = Depends(get_db)):
    stmt = select(Gasto).where(Gasto.id == gasto_id)
    gasto = db.execute(stmt).scalar_one_or_none()

    if not gasto:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Gasto não encontrado")

    db.delete(gasto)
    db.commit()

@app.put("/gasto/{gasto_id}")
def atualizar_gasto(gasto_id:UUIDType, gasto: GastoEntrada, db: Session = Depends(get_db)) -> GastoSaida:
    stmt = select(Gasto).where(Gasto.id == gasto_id)
    gasto_existente = db.execute(stmt).scalar_one_or_none()

    if not gasto_existente:
        raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Gasto não encontrado")

    gasto_existente.nome = gasto.nome
    gasto_existente.valor = gasto.valor
    gasto_existente.data = gasto.data

    db.commit()

    return GastoSaida(id=gasto_existente.id, nome=gasto_existente.nome, valor=gasto_existente.valor, data=gasto_existente.data)
