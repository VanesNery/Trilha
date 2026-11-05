def exibe_ficha(**dados):
    print("----FICHA----")
    for chave, valor in dados.items():
        print(f"{chave.upper()} - {valor}")



ficha_cliente = {
    "nome": "Dino da Silva",
    "estado_civil":"casado",
    "camisa":"xadrez",
    "filhos":True
}

exibe_ficha(**ficha_cliente)
  