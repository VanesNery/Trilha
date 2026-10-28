opcao = 0

while opcao != 3:
    print("1 - Receber um elogio")
    print("2 - Calcular o fatorial")
    print("3 - Sair")
    opcao = int(input("Digite a opção desejada: "))

    if opcao == 1:
        print("Você é uma pessoa muito inteligente!")
    elif opcao == 2:
        numero = int(input("Digite um valor: "))
        fat = numero

        for valor in range(1, numero, 1):
            fat = numero * valor
        print(f"O fatorial de {numero} e {fat}")
    elif opcao == 3:
        print("Tchau tchau")
    else:
        print("Escolha uma opcao do menu")
