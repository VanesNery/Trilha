#criando um set vazio
conjunto = set()
print(type(conjunto))

#criando um set com valores
lista = ["Andre", "David", "Cebolinha", "Andre"]
print(lista)
#criando um set a partir de uma lista
conjunto2 = set(lista)
print(conjunto2)
conjunto3 = {"Cebolinha", "Magali", "Mônica", "Cascão", "Cebolinha"}
print(conjunto3)
#adicionando um elemento (add)
conjunto3.add("Franjinha")
print(conjunto3)
#removendo elementos que estão em outro set (difference_update)
conjunto1={"Mega Drive", "Super Nintendo", "Playstation"}
conjunto2={"Playstation", "Nintendo 64", "Sega Saturn", "Dreamcast"}

print(f"O primeiro set contém {conjunto1}")
print(f"O segundo set contém {conjunto2}")
conjunto1.difference_update(conjunto2)
print(f"O primeiro set contém {conjunto1}")
#remover um elemento especifico do set (remove)
conjunto1={"Mega Drive", "Super Nintendo", "Playstation"}
print(conjunto1)
conjunto1.remove("Mega Drive")
print(conjunto1)
#remover um elemento especifico do set (discard)
conjunto1.discard("Super Nintendo")
print(conjunto1)
conjunto1.discard("Super Nintendo")
print(conjunto1)