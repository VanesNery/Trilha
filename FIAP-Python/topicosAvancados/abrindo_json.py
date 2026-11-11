import json
with open("FIAP-Python/topicosAvancados/arquivo.json", mode="r", encoding="UTF-8") as arquivo:
    conteudo = arquivo.read()

conteudo_convertido = json.loads(conteudo)

print(conteudo_convertido)