texto = "Este texto quebra de linha \naqui. Porém aqui temos uma \ttabulação. E aqui temos uma barra invertida: \\"
print(texto)

texto = "texto em minusculas AINDA É texto"
print(texto.capitalize())
print(texto.upper())
print(texto.lower())
print(texto.startswith("text"))
print(texto.endswith("o"))
print(texto.count("m"))
print(texto.replace("texto", "frase"))