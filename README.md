# TargetFront

Projeto de interface responsável por consumir a **TARGET-API** e exibir a **tabela de comissões** no frontend.

---

## Pré-requisitos

- Node.js e npm instalados na máquina. 
- Projeto **TARGET-API** configurado e funcional (será o provedor dos dados de comissão).  

---

## Passo a passo para rodar o projeto

1. **Inicie a TARGET-API**

    [respositorio target-api](https://github.com/wxcorporations/TARGET-API)

    Certifique-se de subir o projeto de backend **TARGET-API**, pois ele disponibilizará os dados necessários para a tabela de comissões consumida pelo TargetFront.
<br>
1. **Instale as dependências do TargetFront**
   
    No diretório do projeto **TARGET-FRONT**, execute:


    **dependencias**
    ```shell
    npm i
    ```

    **rodar projeto**
    ```shell
    npm run start
    ```