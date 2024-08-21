import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { IMaskInput } from "react-imask";
import { SheetClose } from './ui/sheet';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb';

const FirstStep = ({ data, onNext, selectedNumbers }) => {
    // Dados que irão ser enviados para salvar no banco quando a etapa de pagamento for concluída
    const [formState, setFormState] = useState({
        id: '',
        document: data?.document || '',
        name: data?.name || '',
        email: data?.email || '',
        phone: data?.phone || '',
        cep: data?.cep || '',
        neighborhood: data?.neighborhood || '',
        street: data?.street || '',
        houseNumber: data?.houseNumber || '',
        city: data?.city || '',
        uf: data?.uf || '',
    });

    // Dados para mostrar erros ao avançar a etapa
    const [errors, setErrors] = useState({
        id: '',
        document: '',
        name: '',
        email: '',
        phone: '',
        cep: '',
        neighborhood: '',
        street: '',
        houseNumber: '',
        city: '',
        uf: ''
    });

    // Função para atualizar o estado do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Validações do formulário 

    const isValidCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
            return false; // CPF deve ter 11 dígitos e não pode ser uma sequência de dígitos iguais
        }

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        if (remainder !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }
        return remainder === parseInt(cpf.substring(10, 11));
    };

    const isValidCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
            return false; // CNPJ deve ter 14 dígitos e não pode ser uma sequência de dígitos iguais
        }

        let sum = 0;
        let remainder;

        const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

        for (let i = 0; i < 12; i++) {
            sum += parseInt(cnpj[i]) * weights1[i];
        }
        remainder = (sum % 11);
        if (remainder < 2) {
            remainder = 0;
        } else {
            remainder = 11 - remainder;
        }
        if (remainder !== parseInt(cnpj[12])) {
            return false;
        }

        sum = 0;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cnpj[i]) * weights2[i];
        }
        remainder = (sum % 11);
        if (remainder < 2) {
            remainder = 0;
        } else {
            remainder = 11 - remainder;
        }
        return remainder === parseInt(cnpj[13]);
    };

    const validateForm = () => {
        const newErrors = {};
        // Validação do nome
        if (!formState.name) {
            newErrors.name = 'O nome é obrigatório.';
        }
        // Validação do email
        if (!formState.email) {
            newErrors.email = 'O email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            newErrors.email = 'O email deve ser válido.';
        }
        // Validação do telefone (exemplo básico, ajuste conforme necessário)
        if (!formState.phone) {
            newErrors.phone = 'O telefone é obrigatório.';
        } 
        // else if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(formState.phone)) {
        //     newErrors.phone = 'O telefone deve estar no formato (xx) xxxx-xxxx ou (xx) xxxxx-xxxx.';
        // }
        // Validação do CEP (formato básico)
        if (!formState.cep) {
            newErrors.cep = 'O CEP é obrigatório.';
        } 
        // else if (!/^\d{5}-\d{3}$/.test(formState.cep)) {
        //     newErrors.cep = 'O CEP não é valido.';
        // }
        // Validação do bairro
        if (!formState.neighborhood) {
            newErrors.neighborhood = 'O bairro é obrigatório.';
        }
        // Validação da rua
        if (!formState.street) {
            newErrors.street = 'A rua é obrigatória.';
        }
        // Validação do número
        if (!formState.houseNumber) {
            newErrors.houseNumber = 'O número é obrigatório.';
        }
        // Validação da cidade
        if (!formState.city) {
            newErrors.city = 'A cidade é obrigatória.';
        }
        // Validação da UF
        if (!formState.uf) {
            newErrors.uf = 'A UF é obrigatória.';
        } else if (!/^[A-Z]{2}$/.test(formState.uf)) {
            newErrors.uf = 'A UF deve ser composta por duas letras maiúsculas.';
        }

        // Validação do CPF ou CNPJ
        if (tipoPessoa === 'pessoal') {
            console.log('verificação: ', formState);
            if (!formState.document) {
                newErrors.document = 'O CPF é obrigatório.';
            } else if (!isValidCPF(formState.document)) {
                newErrors.document = 'O CPF é inválido.';
            }
        } else if (tipoPessoa === 'empresa') {
            if (!formState.document) {
                newErrors.document = 'O CNPJ é obrigatório.';
            } else if (!isValidCNPJ(formState.document)) {
                newErrors.document = 'O CNPJ é inválido.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onNext(formState);
        }
    };

    const limitUf = (e) => {
        const value = e.target.value.toUpperCase();
        e.target.value = value.replace(/[^A-Za-z]/g, '').slice(0, 2); // Permite apenas letras e corta no 2º caractere
    };

    const handleCombinedChange = (e) => {
        handleChange(e);
        limitUf(e);
    };

    // Configuração de pessoa física e jurídica
    const [tipoPessoa, setType] = useState('pessoal'); // Estado para selecionar o tipo de pessoa

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setFormState(prevState => ({
            ...prevState,
            id: '',
            document: '',
            name: '',
            email: '',
            phone: '',
            cep: '',
            neighborhood: '',
            street: '',
            houseNumber: '',
            city: '',
            uf: ''
        })); // Limpa o campo quando o tipo de pessoa é alterado
    };

    // Verificação se usuário existe    

    const handleInputChange = async (e) => {
        handleChange(e);
        const value = e.target.value;

        // Verifica se é CPF ou CNPJ (11 ou 14 dígitos)
        if (value.length === 14 || value.length === 17) {

            try {

                const response = await fetch(`http://127.0.0.1:8000/api/getuserbydocument?document=${value}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    if (data.user) {
                        Object.keys(data.user).forEach((key) => {
                            setFormState((prevState) => ({
                                ...prevState,
                                [key === 'number' ? 'houseNumber' : key]: data.user[key], // Atualiza o estado com a chave e valor atuais
                            }));
                        });
                        

                        // Após o estado ser atualizado, você pode forçar o evento de mudança
                        setTimeout(() => {
                            const inputs = ['name', 'email', 'phone', 'cep', 'neighborhood', 'street', 'houseNumber', 'city', 'uf'];
                            inputs.forEach((inputName) => {
                                const input = document.querySelector(`input[name="${inputName}"]`);
                                if (input) {
                                    const event = new Event('input', { bubbles: true });
                                    input.dispatchEvent(event);
                                }
                            });
                        }, 0);
                    } else {
                    }
                } else {
                    console.error('Erro ao verificar usuário.');
                }
            } catch (error) {
                console.error('Erro ao realizar a requisição:', error);
            }
        } else {
            console.error('Erro ao realizar a requisição');
        }
    };

    return (
        <form id="userInfos" onSubmit={handleSubmit}>
            <Breadcrumb className="flex justify-start">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <span className='w-10 h-10 rounded-full border-2 text-slate-200 border-slate-200 flex items-center justify-center'>1</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <span className='uppercase text-slate-200 text-xs md:text-md'>Dados pessoais</span>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <span className='w-10 h-10 rounded-full border-2 text-blue-500 border-blue-500 flex items-center justify-center'>2</span>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <span className='w-10 h-10 rounded-full border-2 text-blue-500 border-blue-500 flex items-center justify-center'>3</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-8 mb-2">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="radio"
                        value="pessoal"
                        checked={tipoPessoa === 'pessoal'}
                        onChange={handleTypeChange}
                        className="appearance-none w-5 h-5 border-2 border-white rounded-full relative checked:bg-blue-500 checked:ring-1 focus:outline-none cursor-pointer"
                    />

                    <span className="ml-2 font-medium text-sm">PESSOAL</span>
                </label>
                <label className="inline-flex items-center ml-6 cursor-pointer">
                    <input
                        type="radio"
                        value="empresa"
                        checked={tipoPessoa === 'empresa'}
                        onChange={handleTypeChange}
                        className="appearance-none w-5 h-5 border-2 border-white rounded-full relative checked:bg-blue-500 checked:ring-1 focus:outline-none cursor-pointer"
                    />
                    <span className="ml-2 font-medium text-sm">EMPRESA</span>
                </label>
            </div>
            {tipoPessoa === 'pessoal' ? (
                <div className="grid w-full items-center gap-1.5">
                    {/* <Input type="text" id="cpf" value={document} placeholder="Digite o CPF" onChange={handleDocumentChange} /> */}
                    <IMaskInput
                        mask="000.000.000-00" type="text" id="cpf" name="document" value={formState.document} placeholder="Digite o CPF" onChange={handleInputChange} className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500'
                    />
                    <small>Se o seu CPF estiver registrado, seus dados serão preenchidos.</small>
                    {errors.document && <p className="text-red-500 text-sm">{errors.document}</p>}
                </div>
            ) : (
                <div className="grid w-full items-center gap-1.5">
                    {/* <Input type="text" id="cnpj" value={document} placeholder="Digite o CNPJ" onChange={handleDocumentChange} /> */}
                    <IMaskInput
                        mask="00.000.000/0000-00" type="text" id="cnpj" name="document" value={formState.document} placeholder="Digite o CNPJ" onChange={handleInputChange} className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500'
                    />
                    <small>Se o seu CNPJ estiver registrado, seus dados serão preenchidos.</small>
                    {errors.document && <p className="text-red-500 text-sm">{errors.document}</p>}
                </div>

            )}
            <Input type="hidden" id="id" name="id" value={formState.id || ''} />
            <div className="grid w-full items-center gap-1.5 mt-2">
                <Input type="text" id="name" name="name" value={formState.name || ''} onChange={handleChange} placeholder="Digite o nome" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5 mt-2">
                <Input type="text" id="email" name="email" value={formState.email || ''} onChange={handleChange} placeholder="Digite o email" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="grid w-full items-center gap-1.5 mt-2">
                {/* <Input type="tel" id="phone" name="phone" value={formState.phone || ''} onChange={handleChange} placeholder="Digite o telefone" /> */}
                <IMaskInput
                    mask="(00) 00000-0000" type="text" id="phone" name="phone" value={formState.phone || ''} onChange={handleChange} placeholder="Digite o telefone" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500'
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div className='grid grid-cols-2 gap-2 mt-2'>
                <div>
                    {/* <Input type="text" id="cep" name="cep" value={formState.cep || ''} onChange={handleChange} placeholder="Digite o CEP" /> */}
                    <IMaskInput
                        mask="00000-000" type="text" id="cep" name="cep" value={formState.cep || ''} onChange={handleChange} placeholder="Digite o CEP" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500'
                    />
                    {errors.cep && <p className="text-red-500 text-sm">{errors.cep}</p>}
                </div>
                <div>
                    <Input type="text" id="neighborhood" name="neighborhood" value={formState.neighborhood || ''} onChange={handleChange} placeholder="Digite o bairro" />
                    {errors.neighborhood && <p className="text-red-500 text-sm">{errors.neighborhood}</p>}
                </div>
            </div>
            <div className='grid grid-cols-3 gap-2 mt-2'>
                <div className="col-span-2">
                    <Input type="text" id="street" name="street" value={formState.street || ''} onChange={handleChange} placeholder="Digite a rua" />
                    {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
                </div>
                <div className="col-span-1">
                    {/* <Input type="text" id="houseNumber" name="houseNumber" value={formState.houseNumber || ''} onChange={handleChange} placeholder="Número" /> */}
                    <IMaskInput
                        mask="00000" type="text" id="houseNumber" name="houseNumber" value={formState.houseNumber || ''} onChange={handleChange} placeholder="Número" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500'
                    />

                    {errors.houseNumber && <p className="text-red-500 text-sm">{errors.houseNumber}</p>}
                </div>
            </div>
            <div className='grid grid-cols-3 gap-2 mt-2'>
                <div className="col-span-2">
                    <Input type="text" id="city" name="city" value={formState.city || ''} onChange={handleChange} placeholder="Digite sua cidade" />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>
                <div className="col-span-1">
                    {/* <Input type="text" id="uf" name="uf" value={formState.uf || ''} onChange={handleChange} placeholder="UF" /> */}
                    <IMaskInput
                        mask="" type="text" id="uf" name="uf" value={formState.uf || ''} onChange={handleCombinedChange} placeholder="UF" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500'
                    />
                    {errors.uf && <p className="text-red-500 text-sm">{errors.uf}</p>}
                </div>
            </div>

            <h3 className='mt-5'>Números selecionados</h3>
            <div className='grid grid-cols-5 gap-2'>
                {selectedNumbers.slice().sort((a, b) => a - b).map((num) => (
                    <Button
                        key={num}
                        variant='available'
                        size="numberbutton"
                    >
                        {num}
                    </Button>
                    // <span className='outline outline-offset-0 outline-available rounded-lg w-min' key={num}>{num}</span>
                ))}
            </div>
            <div className='flex justify-between my-5'>
                <p className='text-primary'>Valor:</p>
                <p className='text-primary'>R$ {selectedNumbers.length * 5},00</p>
            </div>
            <div className='w-full flex flex-col md:flex-row justify-center mt-5 md:justify-between'>
                <Button className='w-full md:w-2/6 md:order-2 hover:bg-transparent hover:border-primary hover:border-2' type="submit">Próxima etapa</Button>
                <SheetClose asChild className='w-full md:w-2/6 md:order-1 flex justify-center mt-3 md:mt-0'>
                    <Button variant="outline">Cancelar</Button>
                </SheetClose>
            </div>
        </form>
    );
};

export default FirstStep;
