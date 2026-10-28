numero = int(input("Por favor, informe o numero do qual deseja o fatorial: "))
fat = numero

for valor in range(1, numero, 1):
    fat = fat * valor

print(f"O fatorial para o valor {numero} foi {fat}")
