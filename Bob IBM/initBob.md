Acesse a pasta ~/.bob/commands/ e substitua o conteúdo do arquivo starBob.md se ele existir, caso contrario, crie ele, e escreva exatamente isto:

---
description: ðŸŽ¬ Easter egg do IBM Bob com animação de introdução.
---

Crie um arquivo chamado inicieAqui.html no diretorio TRILHA-PYTHON-DIO/13 - Bob IBM.

O arquivo deve ser uma pagina HTML standalone, sem dependÃªncias externas, sem CDN, sem imports, tudo inline.

A animação deve seguir exatamente esta sequencia:

---

CENA 1 - Tela preta. Fade in em 2 segundos do texto abaixo, centralizado horizontal e verticalmente, fonte Georgia serif, tamanho 1.8rem, cor branca, estilo italico:

"HÃ¡ muito tempo atrÃ¡s, em uma sala de programaÃ§Ã£o distante, muito distante..."

Fica visÃ­vel por 3 segundos. Depois some com fade out em 2 segundos.

---

CENA 2 - Tela preta. Aparecer com fade in em 2 segundos o seguinte ASCII art, centralizado horizontal e verticalmente, fonte Courier New monospace, tamanho 1.4rem, cor branca, white-space: pre:

    â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•—  â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•— â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•— 
    â–ˆâ–ˆâ•”â•â•â–ˆâ–ˆâ•—â–ˆâ–ˆâ•”â•â•â•â–ˆâ–ˆâ•—â–ˆâ–ˆâ•”â•â•â–ˆâ–ˆâ•—
    â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•”â•â–ˆâ–ˆâ•‘   â–ˆâ–ˆâ•‘â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•”â•
    â–ˆâ–ˆâ•”â•â•â–ˆâ–ˆâ•—â–ˆâ–ˆâ•‘   â–ˆâ–ˆâ•‘â–ˆâ–ˆâ•”â•â•â–ˆâ–ˆâ•—
    â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•”â•â•šâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•”â•â–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ–ˆâ•”â•
    â•šâ•â•â•â•â•â•  â•šâ•â•â•â•â•â• â•šâ•â•â•â•â•â• 
         I B M   B O B

O logo fica visÃ­vel por 30 segundos.

Após 25 segundos do logo aparecer, surgir abaixo do logo com fade in em 1 segundo o texto:

"[ clique em mim ]"

Fonte Georgia serif, tamanho 1.2rem, cor amarela #FFE81F, piscando lentamente (CSS animation alternando opacity entre 1 e 0.3 a cada 1 segundo).

Ao clicar em qualquer lugar da tela, redirecionar para https://bob.ibm.com/ na mesma janela usando window.location.href.

---
