#Dados
#Star Wars - Episodio IV - Uma Nova Esperança, George Lucas, 1977, 775000000.00

#Criação do dicionario
dicionario = {
    "nome" : "Star Wars - Episodio IV - Uma Nova Esperança",
    "diretor" : "George Lucas",
    "ano de lancamento" : 1977,
    "bilheteria" : 775000000.00 
}

#Exibição do dicionario completo
print(dicionario)

#Exibição do valor de uma chave
print(dicionario["nome"])

#Inserção de uma nova chave e valor (gênero)
dicionario["gênero"] = "Ação"
print(dicionario)

#Método Keys
print(dicionario.keys())
for chave in dicionario.keys():
    print(chave)

#Método values
print(dicionario.values())
for valor in dicionario.values():
    print(valor)

#Método items
print(dicionario.items())

for chave, valor in dicionario.items():
    print(f"{chave} = {valor}")

#Método get
print(dicionario.get("publico"))
print(dicionario.get("nome"))

#Método setdefault
dicionario.setdefault("publico", 1000)
print(dicionario)
dicionario.setdefault("publico", 9000)
print(dicionario)