''' Uma loja oferece pagamentos por boleto bancário, cartão de crédito. Os clientes que pagam através de boleto têm direito à 5% de desconto sobre o valor da compra, enquanto os clientes que pagam através de cartão de crédito podem escolher parcelar a compra em até 12x. '''
print("Saldão da alegra!")

total_compra = float(input("Por favor, informe o valor total da compra do cliente: R$ "))
forma_pagamento = int(input("Selecione a forma de pagamento: 1 - Boleto bancário ou 2 - Cartão de crédito: "))

if forma_pagamento == 1:
    desconto = total_compra * 0.05
    valor_final = total_compra - desconto
    print(f"O cliente pagará R$ {valor_final:.2f} com o desconto de R$ {desconto:.2f} aplicado.")
else:
    parcelas = int(input("Informe o número de parcelas (1 a 12): "))
    valor_parcela = total_compra / parcelas
    print(f"O cliente pagará R$ {total_compra:.2f} em {parcelas} parcelas de R$ {valor_parcela:.2f} cada.")