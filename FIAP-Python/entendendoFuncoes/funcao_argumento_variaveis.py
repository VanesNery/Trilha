def exibe_promocao(*clientes):
    for cliente in clientes:
        print(f"Olá, {cliente}!\nQueremos te avisar que a nova X-WING está em promoção!")


exibe_promocao("Luke", "Princesa Leia", "Mestre Yoda")
exibe_promocao("Princesa ")
exibe_promocao("Mestre ")
