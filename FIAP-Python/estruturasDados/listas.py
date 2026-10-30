calorias = []
resposta = ""

while resposta.upper() != "NAO":
    caloria = int(input("Quantas calorias você consumiu nesta refeição? "))
    calorias.append(caloria)
    resposta = input("Você deseja inserir mais uma refeição? ")

total = 0
for caloria in calorias:
    print(f"Nesta refeição foram consumidas {caloria} calorias")
    total = total + caloria

media = total / len(calorias)
print(f"Neste dia, houve um consumo medio de {media} calorias por refeição")