# MCP Server do Geo-Explorer

O projeto expõe as funcionalidades do catálogo como ferramentas MCP. O servidor usa o SDK oficial TypeScript e oferece dois transportes: `stdio` para clientes locais e Streamable HTTP para integração via API compatível com MCP.

## Ferramentas

- `listar_trilhas`: retorna o catálogo de `data/trilhas.json`.
- `consultar_trilha`: recebe tecnologia ou nome da trilha e retorna o plano em Markdown.
- `gerar_desafio`: recebe nível e tecnologia e retorna um desafio em Markdown.
- `gerar_certificado_ficticio`: recebe nome e trilha e retorna certificado em Markdown, identificado como fictício.

## Executar localmente

Requer Node.js 22 ou superior.

```sh
npm install
npm run mcp:stdio
```

Para o endpoint HTTP local:

```sh
npm run mcp:http
```

O transporte HTTP usa `http://127.0.0.1:3333/mcp`; `GET /healthz` serve como verificação de saúde. É possível configurar `MCP_HOST` e `MCP_PORT`. O padrão fica restrito ao loopback do computador. Bind em endereço remoto exige `MCP_ALLOW_REMOTE_BIND=true`, destinado somente a execução em rede privada atrás do gateway autenticado.

## Publicação remota, HTTPS e SSO

O endpoint HTTP usa Streamable HTTP, que transporta chamadas MCP sobre HTTP; não é uma API REST própria. Para disponibilizá-lo na internet, publique-o atrás de um proxy ou gateway que termine TLS e aplique autenticação OAuth/OIDC/SSO, autorização por usuário ou cliente, limites de requisição e logs. O processo Node deve permanecer em rede privada e o proxy deve encaminhar `/mcp` para ele. Não exponha uma instância sem autenticação em uma interface pública.

O servidor não implementa provedor OAuth, login, gestão de usuários, TLS ou implantação em nuvem. Esses serviços dependem do provedor de identidade e da infraestrutura escolhidos; o ponto de integração é a camada HTTP antes do handler MCP. O transporte MCP já está separado das ferramentas, então a autenticação pode ser adicionada sem reescrever a lógica de trilhas.

Para clientes que precisam de uma API HTTP/JSON tradicional, use um gateway REST separado que chame a mesma lógica de `commands/`; o endpoint `/mcp` fala o protocolo MCP JSON-RPC, não rotas REST por ferramenta.
