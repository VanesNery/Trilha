''' Uma companhia aérea permite que seus clientes do tipo premium despachem bagagens de até 32kg sem nenhum custo adicional, enquanto os clientes do tipo gold podem levar malas de até 28kg sem nenhum custo adicional e todos os demais devem pagar por qualquer bagagem despachada.'''
print("Bem-vindo à companhia aérea!")

tipo_cliente = input("Por favor, informe o tipo de cliente: PREMIUM, GOLD OU REGULAR: ")
peso_bagagem = float(input("Informe o peso da bagagem que o cliente deseja despachar: "))

if tipo_cliente.upper() == "PREMIUM":
    if peso_bagagem <= 32:
        print(f"O cliente {tipo_cliente} pode despachar a bagagem sem custo adicional.")
    else:
        peso_excedente = peso_bagagem - 32
        print(f"O cliente {tipo_cliente} excedeu o limite de peso permitido para clientes PREMIUM e deverá pagar pelo excesso. O peso excente é de {peso_excedente}kg")
elif tipo_cliente.upper() == "GOLD":
    if peso_bagagem <= 28:
        print(f"O cliente {tipo_cliente} pode despachar a bagagem sem custo adicional.")
    else:
        peso_excedente = peso_bagagem - 28
        print(f"O cliente {tipo_cliente} excedeu o limite de peso permitido para clientes GOLD e deverá pagar pelo excesso. O peso excente é de {peso_excedente}")
else:
    print("Cliente regular precisa pagar para despachar a mala")
    
