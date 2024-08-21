import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { X } from 'lucide-react';
import * as SheetPrimitive from "@radix-ui/react-dialog"
import PurchaseSteps from './purchaseSteps';
import { Skeleton } from '@/components/ui/skeleton';

const NumberSelector = () => {
    const [numbers, setNumbers] = useState([]);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getNumbers = async () => {
        setIsLoading(true); // Iniciar o carregamento
        try {
            const responseNumbers = await fetch('http://127.0.0.1:8000/api/getnumbers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await responseNumbers.json();
            setNumbers(data);
        } catch (error) {
            console.error('Erro ao buscar números:', error);
        } finally {
            setIsLoading(false); // Parar o carregamento
        }
    }

    const clearNumbers = () => {
        setNumbers([]); // Limpa os números
        setSelectedNumbers([]);
    };

    useEffect(() => {
        getNumbers();
    }, []);

    const toggleNumberSelection = (number) => {
        setSelectedNumbers((prevSelected) =>
            prevSelected.includes(number)
                ? prevSelected.filter((n) => n !== number)
                : [...prevSelected, number]
        );
    };

    const skeletonItems = Array.from({ length: 80 }, (_, index) => index);

    return (
        <div class="bg-boxnumbers p-5 rounded-xl mt-8">
            <p className='text-sm'>Selecione os números a serem comprados*</p>
            <p className='font-medium'>R$ 5,00/número</p>
            <div className='flex space-x-5 my-4'>
                <div className='flex items-center'>
                    <span className='outline outline-offset-0 outline-available rounded-lg w-7 h-7'></span>
                    <span className='text-sm ml-2'>Disponível</span>
                </div>
                <div className='flex items-center'>
                    <span className='flex justify-center items-center outline outline-offset-0 outline-disabled rounded-lg w-7 h-7'>
                        <X size={20} className='text-disabled' />
                    </span>
                    <span className='text-sm ml-2'>Indisponível</span>
                </div>

            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 lg:grid-cols-20 gap-4 md:gap-2 mt-8">
                {isLoading ? (

                    skeletonItems.map((item) => (
                        <Skeleton key={item} className="h-[28px]" />
                    ))

                ) : (
                    numbers.map((number) => (
                        <Button
                            key={number.id}
                            onClick={() => toggleNumberSelection(number.number)}
                            
                            variant={number.is_purchased && number.purchase_status !== "failed" ? 'disabled' : ( selectedNumbers.includes(number.number) ? 'selected' : 'available')}
                            size="numberbutton"
                            disabled={number.is_purchased && number.purchase_status !== "failed"}
                        >
                            {number.is_purchased && number.purchase_status !== "failed" ? (<X size={20} className='text-disabled' />) : number.number}
                        </Button>
                    ))
                )}
                {/*                 
                {numbers.map((number) => (
                    <Button
                        key={number.id} onClick={() => toggleNumberSelection(number.number)} variant={selectedNumbers.includes(number.number) ? 'selected' : (number.is_purchased && number.purchase_status !== "failed" ? 'disabled' : 'available')} size="numberbutton" disabled={number.is_purchased && number.purchase_status !== "failed"}
                    >
                        {number.is_purchased && number.purchase_status !== "failed" ? (<X size={20} className='text-disabled' />) : number.number}
                    </Button>
                ))} */}
            </div>

            <Sheet>
                <div className='w-full flex flex-col md:flex-row mt-8 justify-center items-center md:justify-between'>
                    <SheetTrigger asChild>
                        <Button
                            className="font-medium"
                            disabled={selectedNumbers.length === 0}
                        >
                            {selectedNumbers.length === 0 ? "Nenhum número(s) selecionado(s)" : "Comprar números(s) selecionado(s)"}
                        </Button>
                    </SheetTrigger>

                    <p className='text-sm text-center text-disabled mt-5 md:mt-0'>*Selecione quantos números desejar</p>
                </div>

                <SheetContent className='overflow-auto'>
                    <SheetHeader>
                        <h2 className='text-xl'>Comprar número</h2>
                        <SheetPrimitive.Close
                            className="rounded-sm ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                            <X className="h-7 w-7 background text-slate-200" />
                            {/* <span className="sr-only">Close</span> */}
                        </SheetPrimitive.Close>
                    </SheetHeader>
                    <PurchaseSteps selectedNumbers={selectedNumbers} onPaymentSuccess={getNumbers} />
                    {/* <SheetClose asChild className='w-full flex justify-center mt-3'>
                        <Button variant="outline">Cancelar</Button>
                    </SheetClose> */}
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default NumberSelector;
