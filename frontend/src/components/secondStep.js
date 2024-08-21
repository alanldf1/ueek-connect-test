import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { IMaskInput } from "react-imask";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';


const SecondStep = ({ data, onNext, onBack, selectedNumbers, onPayment }) => {
  // const [formState, setFormState] = useState(data);
  const [formState, setFormState] = useState({
    paymentMethod: data?.paymentMethod || 'credit-card', // 'pix' ou 'cartao'
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const handlePaymentMethodChange = (e) => {
    const paymentMethod = e.target.value;
    setFormState({
      ...formState,
      paymentMethod,
      cardNumber: '',
      cardHolder: '',
      cardExpiry: '',
      cardCvv: ''
    });
  };

  // Função para atualizar o estado do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const [errors, setErrors] = useState({
    paymentMethod: '',
    cardNumber: '',
    cardHolder: '',
    cardExpiry: '',
    cardCvv: ''
  });

  // Função de validação
  const validateForm = () => {
    const newErrors = {};
    if (!formState.paymentMethod) {
      newErrors.paymentMethod = 'É necessário selecionar o tipo de pagamento.';
    }
    // Validação do nome
    if (formState.paymentMethod == 'credit-card') {
      // Validação do número do cartão de crédito
      if (!formState.cardNumber) {
        newErrors.cardNumber = 'O número do cartão é obrigatório.';
      }
      // else if (!/^\d{16}$/.test(formState.cardNumber)) {
      //   newErrors.cardNumber = 'O número do cartão deve ter 16 dígitos.';
      //}  else if (!/\S+@\S+\.\S+/.test(formState.cardNumber)) {
      //   newErrors.cardNumber = 'O número do cartão deve ser válido.';
      // }

      // Validação do telefone (exemplo básico, ajuste conforme necessário)
      if (!formState.cardHolder) {
        newErrors.cardHolder = 'O nome impresso é obrigatório.';
      }

      // Validação da data de validade do cartão (MM/AA)
      if (!formState.cardExpiry) {
        newErrors.cardExpiry = 'A data de validade é obrigatória.';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formState.cardExpiry)) {
        newErrors.cardExpiry = 'A data de validade deve estar no formato MM/AA.';
      }

      // Validação do CVV
      if (!formState.cardCvv) {
        newErrors.cardCvv = 'O CVV é obrigatório.';
      } else if (!/^\d{3,4}$/.test(formState.cardCvv)) {
        newErrors.cardCvv = 'O CVV deve ter 3 ou 4 dígitos.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const savePurchase = onPayment(formState)
      if(savePurchase){
        onNext();
      }else{
        console.log('Erro ao realizar o pagamento. Tente novamente mais tarde.')
      }
      

    }
  };

  const goBack = (e) => {
    e.preventDefault();
    onBack(formState);
  };

  return (
    <form id="paymentInfos" onSubmit={handleSubmit}>
      <Breadcrumb className="flex justify-start">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <span className='w-10 h-10 rounded-full border-2 text-blue-500 border-blue-500 flex items-center justify-center'>1</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <span className='w-10 h-10 rounded-full border-2 text-slate-200 border-slate-200 flex items-center justify-center'>2</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className='uppercase text-slate-200 text-xs md:text-md'>Pagamento</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className='w-10 h-10 rounded-full border-2 text-blue-500 border-blue-500 flex items-center justify-center'>3</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
      <div className='mt-8'>
        <label className='flex items-center cursor-pointer'>
          <input className="mr-2 appearance-none w-5 h-5 border-2 border-white rounded-full relative checked:bg-blue-500 checked:ring-1 focus:outline-none cursor-pointer" type="radio" name="paymentMethod" value="credit-card" checked={formState.paymentMethod === 'credit-card'} onChange={handlePaymentMethodChange} />
          Cartão de Crédito
        </label>
      </div>
      {/* Campos adicionais para cartão de crédito */}
      {formState.paymentMethod === 'credit-card' && (
        <div>
          <div className="grid w-full items-center gap-1.5 mt-2">
            <IMaskInput mask="0000 0000 0000 0000" type="text" name="cardNumber" value={formState.cardNumber} onChange={handleChange} placeholder="Número do Cartão" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500' />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>
          <div className="grid w-full items-center gap-1.5 mt-2">
            <input type="text" name="cardHolder" value={formState.cardHolder} onChange={handleChange} placeholder="Nome no Cartão" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500 uppercase placeholder:normal-case' />
            {errors.cardHolder && <p className="text-red-500 text-sm">{errors.cardHolder}</p>}
          </div>
          <div className='grid grid-cols-2 gap-2 mt-2'>
            <div>
              <IMaskInput mask="00/00" type="text" name="cardExpiry" value={formState.cardExpiry} onChange={handleChange} placeholder="Validade (MM/AA)" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500' />
              {errors.cardExpiry && <p className="text-red-500 text-sm">{errors.cardExpiry}</p>}
            </div>
            <div>
              <IMaskInput mask="000" type="text" name="cardCvv" value={formState.cardCvv} onChange={handleChange} placeholder="CVV" className='flex pl-1 placeholder:pl-0 h-10 w-full form-radio text-slate-200 bg-transparent border-b border-gray-300 focus:border-b focus:border-blue-500 focus:ring-0 placeholder-gray-500' />
              {errors.cardCvv && <p className="text-red-500 text-sm">{errors.cardCvv}</p>}
            </div>
          </div>
        </div>
      )}
      <div className='mt-5'>
        <label className='flex items-center cursor-pointer'>
          <input className="mr-2 appearance-none w-5 h-5 border-2 border-white rounded-full relative checked:bg-blue-500 checked:ring-1 focus:outline-none cursor-pointer" type="radio" name="paymentMethod" value="pix" checked={formState.paymentMethod === 'pix'} onChange={handlePaymentMethodChange} />
          Pix
        </label>
      </div>
      <div className='flex justify-between my-5'>
        <p className='text-primary'>Valor:</p>
        <p className='text-primary'>R$ {selectedNumbers.length * 5},00</p>
      </div>
      <div className='w-full flex flex-col md:flex-row justify-center md:justify-between mt-5'>
        <Button className='w-full md:w-2/6 md:order-2 hover:bg-transparent hover:border-primary hover:border-2' type="submit">Fazer pagamento</Button>
        <Button className='w-full md:w-2/6 md:order-1 bg-gray-500 mt-3 md:mt-0 hover:bg-transparent hover:border-gray-500 hover:border-2' type="button" onClick={goBack}>Voltar</Button>
      </div>
    </form>
  );
};

export default SecondStep;
