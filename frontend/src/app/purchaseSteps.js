import React, { useState } from 'react';

// Componentes das etapas
import FirstStep from '../components/firstStep';
import SecondStep from '../components/secondStep';
import ConfirmationStep from '../components/confirmationStep';

const PurchaseSteps = ({ selectedNumbers, onPaymentSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    paymentInfo: {},
  });

  const handleNextStep = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  function removeMask(value) {
    return value.replace(/\D/g, '');
  }

  const handlePayment = async (data) => {
    setFormData({ ...formData, ...data });

    const userInfo = {
      id: formData.personalInfo.id,
      cpf: removeMask(formData.personalInfo.document).length === 11 ? removeMask(formData.personalInfo.document) : null,
      cnpj: removeMask(formData.personalInfo.document).length === 14 ? removeMask(formData.personalInfo.document) : null,
      name: formData.personalInfo.name,
      email: formData.personalInfo.email,
      phone: formData.personalInfo.phone,
      cep: formData.personalInfo.cep,
      neighborhood: formData.personalInfo.neighborhood,
      street: formData.personalInfo.street,
      number: formData.personalInfo.houseNumber,
      city: formData.personalInfo.city,
      uf: formData.personalInfo.uf
    };

    const userId = await saveUserInfo(userInfo);
    console.log(userId);
    const paymentInfo = {
      paymentMethod: data.paymentInfo.paymentMethod,
      value: selectedNumbers.length * 5,
      status: 'pending',
      selectedNumbers: selectedNumbers,
      userId: userId
    };

    const resultPurchase = await purchaseNumbers(paymentInfo);

    return resultPurchase;
  };

  const saveUserInfo = async (userInfo) => {
    try {
      // const csrfToken = await getCsrfToken();
      const response = await fetch('http://127.0.0.1:8000/api/saveuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'X-Csrf-token': csrfToken,
        },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }
      const result = await response.json();
      return result.user.id;
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
      return false;
    }
  };

  const purchaseNumbers = async (paymentInfo) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/savepurchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(paymentInfo),
      });
      if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.statusText);
      }

      const result = await response.json();
      if (onPaymentSuccess) {
        onPaymentSuccess(); // Chama a função para atualizar os números
      }
      return result.purchase.id;
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
      return false;
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      {step === 1 && (
        <FirstStep
          data={formData.personalInfo}
          onNext={(data) => handleNextStep({ personalInfo: data })}
          selectedNumbers={selectedNumbers}
        />
      )}
      {step === 2 && (
        <SecondStep
          data={formData.paymentInfo}
          onNext={handleNextStep}
          onBack={handlePreviousStep} selectedNumbers={selectedNumbers}
          onPayment={(data) => handlePayment({ paymentInfo: data })}
        />
      )}
      {step === 3 && (
        <ConfirmationStep data={formData} selectedNumbers={selectedNumbers} />
      )}
    </div>
  );
};

export default PurchaseSteps;
