import { CircleCheckBig } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
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

const ConfirmationStep = ({ data }) => {
  return (
    <div>
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
              <span className='w-10 h-10 rounded-full border-2 text-blue-500 border-blue-500 flex items-center justify-center'>2</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className='w-10 h-10 rounded-full border-2 text-slate-200 border-slate-200 flex items-center justify-center'>3</span>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span className='uppercase text-slate-200 text-xs md:text-md'>Concluído</span>
          </BreadcrumbItem>

        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex items-center gap-2 mt-8'>
        <CircleCheckBig size={40} color="#47A4F9" strokeWidth={1} />
        <h2 className='w-10/12 font-medium'>COMPRA FINALIZADA COM SUCESSO</h2>
      </div>
      <p className='w-full font-light mt-5'>Obrigado por ser parte deste capítulo importante na vida dos alunos. Cada passo dado em direção ao objetivo é possível graças a pessoas incríveis como você.</p>
      <div className='w-full flex flex-col justify-center mt-5'>
        <SheetClose asChild className='w-full flex justify-center mt-3'>
          <Button>Fechar</Button>
        </SheetClose>
      </div>
    </div>
  );
};

export default ConfirmationStep;
