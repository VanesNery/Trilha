#importacao do orderedDict
from collections import OrderedDict

#criacao
dicionario_ordenado = OrderedDict()
print(dicionario_ordenado)

#Adicionando chaves e valores
dicionario_ordenado["NOME"] = "Iphone"
dicionario_ordenado["MARCA"] = "Apple"
dicionario_ordenado["MODELO"] = "14 PRO MAX"

#Percorrendo para verificar a ordem
for chave, valor in dicionario_ordenado.items():
    print(f"{chave} -- {valor}")

#Alterando um novo item
dicionario_ordenado["MARCA"] = "Maçã"
print()

#Percorrendo para verificar a ordem
for chave, valor in dicionario_ordenado.items():
    print(f"{chave} -- {valor}")

#Removendo um item
dicionario_ordenado.pop("MARCA")
print()

#Percorrendo para verificsr a ordem
for chave, valor in dicionario_ordenado.items():
    print(f"{chave} -- {valor}")

#Reinserindo um item neste dicionario
dicionario_ordenado["MARCA"] = "Apple"
print()

#Percorrendo para verificsr a ordem
for chave, valor in dicionario_ordenado.items():
    print(f"{chave} -- {valor}")
