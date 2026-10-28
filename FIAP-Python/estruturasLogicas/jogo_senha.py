resposta = ""
tentativa = 0

while resposta != "python":
    resposta = input("Digite a senha secreta! ")
    tentativa += 1

print("A senha correta foi digitada!")
print(f"Você acertou depois {tentativa} tentativas")
