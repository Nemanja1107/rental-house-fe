import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '../../contexts/TranslationContext';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ: React.FC = () => {
    const { t } = useTranslation();
    const [openItems, setOpenItems] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenItems(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const faqItems: FAQItem[] = [
        {
            question: t('faqCheckInQuestion'),
            answer: t('faqCheckInAnswer')
        },
        {
            question: t('faqCheckOutQuestion'),
            answer: t('faqCheckOutAnswer')
        },
        {
            question: t('faqPaymentQuestion'),
            answer: t('faqPaymentAnswer')
        },
        {
            question: t('faqParkingQuestion'),
            answer: t('faqParkingAnswer')
        },
        {
            question: t('faqPetFriendlyQuestion'),
            answer: t('faqPetFriendlyAnswer')
        },
        {
            question: t('faqHeatingQuestion'),
            answer: t('faqHeatingAnswer')
        },
        {
            question: t('faqWifiQuestion'),
            answer: t('faqWifiAnswer')
        },
        {
            question: t('faqCancellationQuestion'),
            answer: t('faqCancellationAnswer')
        }
    ];

    return (
        <section id="faq" className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('faqTitle')}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {t('faqSubtitle')}
                    </p>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                    {item.question}
                                </h3>
                                {openItems.includes(index) ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                                )}
                            </button>

                            {openItems.includes(index) && (
                                <div className="px-6 py-4 bg-white border-t border-gray-200">
                                    <p className="text-gray-700 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Info */}
                <div className="text-center mt-12 p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t('faqContactTitle')}
                    </h3>
                    <p className="text-gray-600">
                        {t('faqContactText')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;