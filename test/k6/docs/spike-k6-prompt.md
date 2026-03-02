Objetivo:
Crie um teste de spike com K6 para registrar um usuário, fazer login dele e realizar o checkout.


Contexto:
- O k6 já está instalado na minha máquina.
- O teste a ser criado é apenas para o fluxo principal (não preciso de fluxo alternativo ou de exceção).
- Para registrar, olhe o Swagger.yaml e pesquise como funciona o POST /auth/register. Emails devem ser únicos.
- Para logar, olhe o Swagger.yaml e pesquise como funciona o POST /auth/login.
- Para fazer o checkout, olhe o Swagger.yaml e pesquise como funciona o POST /checkout. Esse endpoint precisa de um token Bearer JWT que pode ser extraido do POST /auth/login na propriedade data.token. No checkout, use o productId 1 com 1 de quantidade e cash como método de pagamento.


Regras:
- Salve o teste dentro da pasta test/k6/
- Crie check do status code de sucesso contido na resposta de cada request que você fizer.
- Separe ações similares em groups.
- Crie uma pasta helpers dentro do diretório test/k6 para armazenar funções comuns que poderão ser reaproveitadas em outros testes (ex. login).
- Crie uma função helper para geração de emails aleatórios.
- Crie uma variavel de ambiente BASE_URL para substituir base url atual, esse valor sera passado por linha de comando. Crie uma função de obtenção do base URL e armazene em um helper com o mesmo nome da função.
- Crie uma Trend (importando de k6/metrics) para monitorar o tempo de duração das requests feitas para POST /checkout.
- Execute os testes depois de criar e analise se o percentil do tempo de resposta atende aos requisitos e me avise quanto a checks que porventura tenham falhado.

Definicao: 
Testes de spike ou picos são testes que descobrem como o sistema funciona com aumentos repentinos e massivos de tráfego.