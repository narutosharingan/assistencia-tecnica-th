# Assistência Técnica TH — versão para publicação

## O que está pronto
- Site responsivo em `public/index.html`
- Cadastro/login simples de clientes por e-mail
- E-mail do administrador reconhecido separadamente
- Login administrativo preparado para validação no servidor
- Formulário de orçamento/agendamento
- Botão de WhatsApp para `5569981038739`
- API para receber agendamentos
- Estrutura Node.js/Express pronta para hospedagem

## Importante sobre a senha
A senha do administrador NÃO fica no HTML. Antes de publicar, gere um hash para a senha escolhida e coloque o resultado em `ADMIN_PASSWORD_HASH` nas variáveis de ambiente da hospedagem.

Exemplo local:
`node -e "require('bcrypt').hash('SUA_SENHA', 12).then(console.log)"`

Não coloque `.env` no GitHub.

## Rodar no computador
1. Instale Node.js.
2. Abra um terminal nesta pasta.
3. Rode `npm install`.
4. Defina as variáveis do `.env`/ambiente.
5. Rode `npm start`.
6. Abra `http://localhost:3000` no Chrome.

## Para produção
É necessário uma hospedagem que execute Node.js (por exemplo, Render, Railway ou um VPS). O armazenamento atual de agendamentos é em memória apenas para demonstração; para produção, substitua `bookings` por PostgreSQL/Supabase ou outro banco persistente.

## E-mail e WhatsApp
O botão de WhatsApp já abre a conversa com mensagem pronta. Para o servidor enviar notificações automáticas por e-mail e WhatsApp sem depender do navegador, é necessário configurar um provedor de e-mail (SMTP/API) e a API oficial do WhatsApp Business/Cloud API.
