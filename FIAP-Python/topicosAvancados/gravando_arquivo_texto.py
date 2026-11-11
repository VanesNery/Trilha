texto_para_gravar = "Este texto será gravado!"

with open("FIAP-Python/topicosAvancados/arquivo_text.text", mode="w", encoding="UTF-8") as arquivo:
    arquivo.write(texto_para_gravar)

print("O Arquivo foi gravado.")