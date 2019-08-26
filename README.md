# Trabalho - Sistemas Distribuidos

**Ideia inicial**:
A ideia é criar uma aplicação onde várias pessoas podem se conectar e mandar mensagens tanto para um usuario especifico quanto para uma sala.

**Funcionamento**:
Na aplicação cada usuario ira criar uma conta e a partir desse momento, ele poderá mandar mensagens para usuarios ou salas.
Poderá haver salas privadas com senha para conversar com usuarios especificos e também haveŕa salas publicas que qualquer usuario poderá se conectar e mandar mensagens
Já a respeito de chats entre os usuarios, qualquer usuario que tiver o username do outro podera mandar mensagens para ele
O usuario tambem devera receber notificacoes se receber alguma mensagem particular

**Ferramentas**:
* O backend da aplicação será implementado com Python e Django
* O frontend da aplicação será implementado com VueJs/Nuxt
* Como DB, será usado PostgreSQL

**Componentes**
 * Backend
 * Frontend
 * Banco de Dados

**Testes**
* Demonstração de funcionalidades: Mostrar que as funcionalidades foram implementadas
* Teste de concorrência: mostrar que multiplos usuarios possam acessar a aplicação ao mesmo tempo.
* Teste de recuperação de falhas: mostrar que se a aplicação falhar, quando voltar a executar não haverá nenhum estado inesperado.
