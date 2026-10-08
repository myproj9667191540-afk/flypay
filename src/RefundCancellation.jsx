import { useState } from 'react';
import { useLanguage } from './LanguageContext.jsx';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const sections = [
  { title: 'Refund & Cancellation', content: [
    'We have pledged to provide you world class products and services for every single business you have made with us in near past, or future and as of now. We want you to have a swift and hassle free experience while you access the FlyPay Technology Private Limited',
    'We certify you about the quality and genuineness of the entire product and service range on the FlyPay Technology Private Limited web portal. But in any case, you have any lack of contentment and grievance toward our product or services, we apologize for that, and you will be served with our Peace of Mind policy.'
  ]},
  { title: 'Unused Balance Clause', content: [
    'Any top-up payment / advance payment which is received from retailers / distributors deposit the advance payment to his retail account for, the retailer / distributor does not use the amount for goods & services and he wants his payment to return in this case after one month of deposit, retailer need to give refund request to us, once we will get refund request from the retailer, the balance amount will be refunded within 15 to 20 working days via same source.'
  ]},
  { title: 'Return and Exchange', content: [
    'Our entire Product and Service catalogue is backed up by 3 day return and exchange policy, in case of error, or mishap happens during placement of the product, from the first of product or service acquisition to the cancellation date.',
    'Products or services, like Bus Tickets, Flight Tickets, Mobile & DTH Recharge, Hotel Booking are only liable for return and exchange only when purchased from FlyPay Technology Private Limited web portal. We do not accept third party products under our policy.',
    'In any case, if someone has not received their product or service, but has made the transaction, can reacquisition or reacquisition of product or avail another service of same monetary value, simply by making a phone call.',
    'A product or service is only liable under return and exchange policy if the request is made within 3 days of its acquisition, and accepted channels for making such request are our official support mail address and second by contacting through our helpline number.'
  ]},
  { title: 'Cancellation', content: [
    'In any case, if you do not want to opt for exchange and return policy, and want your money refunded to you, you can always cancel your product or service acquisition. But there are certain policy norms, you need to learn before you ask for any cancellation and refund.',
    'We do not entertain cancellation and refund if a request is not made within a specific period of time, the product cancellation time is different from product to product, maximum period for making any cancellation request could be 7 days, and entirely depends on the product and service you avail.',
    'There is no cancellation accepted that is beyond our control, for example mobile & DTH recharge, data card recharge, insurance premium payment, and utility bill payment.',
    'In case you have signed up for any third party product and service through our interface, there will be no refund on such cancellation, as it is not possible to control third party products and services.',
    'The only valid medium to make cancellation and refund requests is through our support mail or by calling our support centre',
    'It may take up to 7 days for the entire cancellation and return process to be complete.',
    'You need to be in touch with your bank, for the knowledge of the entire refunded money.',
    'We only can refund the partial or full amount of transaction, according to company policy on product and service, for more information, you need to specifically go through their cancellation policy rules.'
  ]},
  { title: 'Note', content: [
    'All sales of Recharge are final and there will be no refund or exchange permitted. Please be advised that You are responsible for the mobile number or DTH account number you purchase Recharge for and all charges that result from those purchases FlyPay Technology Private Limited is not responsible for any purchase of Recharge for an incorrect mobile number or DTH account number.',
    'However, in a case where a transaction has been completed by you on the Site, and money has been charged to your wallet, card or bank account but a Recharge has not delivered within 24 hours of your completion of the transaction then you may inform us by Using Raise Complaint Option or you may call us on Customer Care Number which has already been published. In such a scenario you will be entitled to a full refund. We request you to include in the following details - the mobile number or DTH account number, operator name, Recharge value, Transaction date and Order Number. FlyPay Technology Private Limited shall investigate the incident and if it is found that money was indeed charged to your card or bank account without delivery of Recharge then you will be refunded the money within 7 working days from the date of receipt of your email.'
  ]}
];

export default function RefundCancellation() {
  const { t } = useLanguage();
  const [collapsed, setCollapsed] = useState(() => new Set());
  const toggle = index => setCollapsed(previous => { const next = new Set(previous); next.has(index) ? next.delete(index) : next.add(index); return next; });
  return <main className="policy-page refund-page" id="refund-cancellation"><section className="policy-hero"><div className="policy-hero-inner"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}><span className="policy-kicker"><RotateCcw size={14}/> FLYPAY TECHNOLOGY PRIVATE LIMITED</span><h1>{t("Refund & Cancellation")}</h1><p>Returns, exchanges and cancellation information</p></motion.div><motion.div className="policy-hero-mark" aria-hidden="true" animate={{ rotate: 360 }} transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}>✳</motion.div></div></section><div className="policy-layout refund-layout"><aside className="policy-index"><span>{t("ON THIS PAGE")}</span>{sections.map((section,index)=><a key={section.title} href={`#refund-${index}`} onClick={()=>document.getElementById(`refund-${index}`)?.scrollIntoView({behavior:'smooth'})}>{t(section.title)}<span>{String(index+1).padStart(2,'0')}</span></a>)}<a className="policy-back" href="#home">Back to FlyPay <ArrowUpRight size={13}/></a></aside><article className="policy-content">{sections.map((section,index)=><motion.section id={`refund-${index}`} className="policy-section" key={section.title} initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.35}}><span className="policy-section-number">{String(index+1).padStart(2,'0')}</span><button className="policy-section-toggle" onClick={()=>toggle(index)} aria-expanded={!collapsed.has(index)}><h2>{t(section.title)}</h2>{collapsed.has(index)?<ChevronDown size={17}/>:<ChevronUp size={17}/>}</button>{!collapsed.has(index)&&<div className="policy-paragraphs">{section.content.map((paragraph,j)=><p key={j}>{paragraph}</p>)}</div>}</motion.section>)}</article></div></main>;
}
