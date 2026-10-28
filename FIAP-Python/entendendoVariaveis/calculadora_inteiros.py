print("Boas vindas ao calculador de inteiros")
primeiro_valor = int(input("Digite o primeiro valor: "))
segundo_valor = int(input("Digite o segundo valor: "))
soma = primeiro_valor + segundo_valor
substracao = primeiro_valor - segundo_valor
divisao = primeiro_valor / segundo_valor
multiplicacao = primeiro_valor * segundo_valor

# print("O resultado da soma foi " + str(soma))
print(f"O resultado da soma foi {soma}")
print(f"O resultado da subtração foi {substracao}")
print(f"O resultado da divisão foi {divisao:.2f}")
print(f"O resultado da multiplicação foi {multiplicacao}")