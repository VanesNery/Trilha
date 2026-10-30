op = 0
ficha = {}

while op != 4:
    print("\nFICHA CADASTRAL")
    print("1 - Incluir informações na ficha")
    print("2 - Recuperar informação da ficha")
    print("3 - Exibir a ficha completa")
    print("4 - Sair ")
    op = int(input("Informe a opção desejada: "))

    if op == 1:
        #inserir dados na ficha
        chave = input("Informe o campo que deseja cadastrar na ficha: ")
        valor = input("Informe o dado que deseja neste campo: ")
        # ficha[chave] = valor
        ficha.update({chave:valor})
    elif op == 2:
        #recuperar dados da ficha
        print(f"Os campos disponiveis na ficha são {ficha.keys()}")
        chave = input("Informe qual campo deseja exibir: ")

        if chave in ficha.keys():
            print(ficha.get(chave))
        else:
            print("Esse campo não existe")
    elif op == 3:
        #exibir ficha completa
        print("FICHA CADASTRAL")
        for chave, valor in ficha.items():
            print(f"{chave.upper()} --- {valor}")
    elif op == 4:
        print("Saindo do sistema de ficha cadastral")
        break
    else:
        print("Por favor, escolha uma opção válida")