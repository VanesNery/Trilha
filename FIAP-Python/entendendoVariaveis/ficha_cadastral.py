print("Cadastro de doadores de sangue")
nome = input("Digite seu nome: ")
peso = float(input("Digite seu peso: "))
altura = int(input("Digite sua altura: "))
ano_nascimento = int(input("Digite seu ano de nascimento: "))

idade = 2026 - ano_nascimento

tem_peso_minimo = peso > 50
tem_idade_minima = idade >= 16

texto_saida = f"\tNOME: {nome}\n\tPESO: {peso} kg\n\tALTURA: {altura}cm\n\tIDADE: {idade}\n\tTEM PESO MÍNIMO PARA DOAR: {tem_peso_minimo}\n\tTEM IDADE MÍNIMA PARA DOAR: {tem_idade_minima}"

print(texto_saida)