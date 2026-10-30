#importação
from collections import defaultdict

#criacao de um default dict com uma lista como valor padrão
dicionario_lista = defaultdict(list)
dicionario_lista["PRODUTO"] = "MacBook Pro"
dicionario_lista["MARCA"] = "Apple"

print(dicionario_lista["PRECO"])
print(dicionario_lista)

#Criação de função que retorna a frase "INEXISTENTE"
def funcao_exemplo():
    return "INEXISTENTE"

dicionario_funcao = defaultdict(funcao_exemplo)
dicionario_funcao["PRODUTO"] = "MacBook Pro"
dicionario_funcao["MARCA"] = "Apple"

print(dicionario_funcao)
print(dicionario_funcao["PRECO"])
print(dicionario_funcao)

#Criação de dicionário com uma função lamda
dicionario_lambda = defaultdict(lambda: "Não disponivel")
dicionario_lambda["PRODUTO"] = "MacBook Pro"
dicionario_lambda["MARCA"] = "Apple"

print(dicionario_lambda)
print(dicionario_lambda["PRECO"])
print(dicionario_lambda)
