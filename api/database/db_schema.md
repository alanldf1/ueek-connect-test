# Users
### Description
This table contains the user information. Users that will buy numbers and fill the form. They'll be registered on DB to next purchase.

## Tables
1. Users
    - id
    - cpf   
    - cnpj
    - name
    - email
    - phone
    - cep
    - neighborhood
    - street
    - number
    - city
    - uf
    - create_date
    - update_date

2. Numbers
    - id
    - number
    
3. Purchase
    - id
    - user_id
    - payment_type
        - credit_card
        - pix
    - value
    - status
        - 0: Reservado
        - 1: Pago
        - 2: Expirado
    - create_date_time
    - update_date_time

4. Purchased numbers
    - id 
    - purchase_id
    - number_id

    