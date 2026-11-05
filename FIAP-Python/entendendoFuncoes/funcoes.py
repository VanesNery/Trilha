#Função para calcular velocidade média
def calcular_velocidade_media(distancia:float, tempo:float, unidade_medida="km/h"):
    if tempo == 0:
        return 0
    velocidade_media = distancia / tempo
    #exibir o resultado
    return f"{velocidade_media}{unidade_medida}"

#Função para converter a temperatura
def converter_temperatura(temperatura: float, unidade_medida="celsius"): 
    if unidade_medida == "celsius":
        return temperatura * 1.8 + 32
    elif unidade_medida == "fahrenheit":
        return (temperatura - 32)/1.8
    else:
        return 0

#Função para exibir um menu
def exibir_menu():
    print("MENU")
    print("1 - Calcular a velocidade media ")
    print("2 - Converter a temperatura ")
    print("3 - Sair")

#Função para chamar as outras funções
def funcoes():
    exibir_menu()
    while True:
        opcao = int(input("Digite a opção desejada: "))

        if opcao == 1:
            dist = float(input("Digite a distancia: "))
            temp = float(input("Digite o tempo: "))
            medida = input("Digite a unidade de medida: ")
            print(calcular_velocidade_media(dist, temp, medida))
        elif opcao == 2:
            unidade = input("Digite a unidade de medida (celsius, fahrenheit): ")
            temperatura = float(input("Digite a temperatura: "))
            print(converter_temperatura(temperatura, unidade))
        elif opcao == 3:
            print("Saindo do Menu")
            break
        else:
            print("Opção invalida!")

