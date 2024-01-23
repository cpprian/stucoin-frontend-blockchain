import { cn } from 'lib/utils';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import React, { Fragment } from 'react';
import { ClassNameable } from 'types/common';
import { useWallet } from 'useink';
import { Listbox } from '@headlessui/react'

export const Accounts: React.FC<ClassNameable> = ({ className }) => {
  const { setAccount, account, accounts } = useWallet();

  if (!accounts?.length) return null;

  return (
    <div className={cn('w-full', className)}>
      <h2 className='text-2xl font-bold mb-6 text-white'>Accounts</h2>

      <Listbox
        value={account}
        onChange={(a) => {
          setAccount(a);
        }}
      >
        <div className='relative'>
          <Listbox.Button
            className={cn(
              'relative min-w-[200px] w-full cursor-default rounded-lg bg-violet-900 py-2 pl-3 pr-10 text-left',
              'focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white',
              'focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300',
              'sm:text-sm hover:cursor-pointer hover:opacity-80',
            )}
          >
            <span className='block truncate text-white/70'>
              {account?.name || account?.address}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
            <Listbox.Options
              className={cn(
                'absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-violet-900 py-1 text-base shadow-lg ring-1',
                'ring-black ring-opacity-5 focus:outline-none sm:text-sm',
              )}
            >
              {accounts?.map((acc) => (
                <Listbox.Option
                  key={acc.address}
                  className={({ active }) =>
                    cn(
                      'relative cursor-default select-none py-2 pl-10 pr-4 hover:cursor-pointer',
                      active ? 'bg-violet-800 text-gray-300' : 'text-gray-300',
                    )
                  }
                  value={acc}
                >
                  {() => {
                    const selected =
                      account && account.address === acc?.address;
                    return (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {acc.name || acc.address}
                        </span>

                        {selected && (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        )}
                      </>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};
