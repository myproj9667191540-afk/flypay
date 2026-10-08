import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);
const hi = {
  'Home':'होम','About us':'हमारे बारे में','Services':'सेवाएँ','How it works':'कैसे काम करता है','Contact':'संपर्क करें','Login':'लॉग इन','Get started':'शुरू करें',
  'DIGITAL SERVICES • MADE FOR BHARAT':'भारत के लिए डिजिटल सेवाएँ','Everyday payments.':'रोज़मर्रा के भुगतान।','Made easy.':'आसानी से।','From mobile recharges and DTH to Bharat BBPS bill payments and digital banking — FlyPay brings everyday services together in one simple place.':'मोबाइल रिचार्ज और DTH से लेकर भारत BBPS बिल भुगतान और डिजिटल बैंकिंग तक — FlyPay रोज़मर्रा की सेवाएँ एक ही आसान जगह पर लाता है।','Get in touch':'संपर्क करें','Explore our services':'हमारी सेवाएँ देखें','Secure payments':'सुरक्षित भुगतान','Customer support':'ग्राहक सहायता','Get to know us':'हमारे बारे में जानें',
  'Mobile & DTH':'मोबाइल और DTH','Recharge services':'रिचार्ज सेवाएँ','Bharat BBPS':'भारत BBPS','Bill payments':'बिल भुगतान','Digital banking':'डिजिटल बैंकिंग','Financial services':'वित्तीय सेवाएँ','Contact our team':'हमारी टीम से संपर्क करें',
  'MADE FOR EVERYDAY LIFE':'रोज़मर्रा के लिए','Core payment services':'मुख्य भुगतान सेवाएँ','for Bharat.':'भारत के लिए।','From recharges to household bills, take care of the essentials with FlyPay’s digital services.':'रिचार्ज से लेकर घर के बिल तक, FlyPay की डिजिटल सेवाओं से ज़रूरी काम आसान करें।','A little more':'और जानें','Take a look':'देखें','Secure and reliable services':'सुरक्षित और भरोसेमंद सेवाएँ','Need help? Contact the FlyPay support team.':'मदद चाहिए? FlyPay सहायता टीम से संपर्क करें।',
  'ABOUT FLYPAY':'FlyPay के बारे में','One platform.':'एक मंच।','Everyday services.':'रोज़मर्रा की सेवाएँ।','More peace of mind.':'ज़्यादा निश्चिंतता।','FlyPay is a digital service provider bringing mobile recharge, DTH recharge, Bharat BBPS bill payments and digital banking together across India.':'FlyPay एक डिजिटल सेवा प्रदाता है जो भारत में मोबाइल रिचार्ज, DTH रिचार्ज, भारत BBPS बिल भुगतान और डिजिटल बैंकिंग सेवाएँ उपलब्ध कराता है।','Our goal is simple: make the essential payments in your day easier to reach, easier to use and easier to trust.':'हमारा लक्ष्य आसान है: रोज़ के ज़रूरी भुगतान को पाना, इस्तेमाल करना और भरोसा करना आसान बनाना।','Talk to our team':'हमारी टीम से बात करें','Recharge':'रिचार्ज','Pay a bill':'बिल भरें','Banking':'बैंकिंग','Simple & secure':'सरल और सुरक्षित','DTH, sorted':'DTH, आसान हुआ','Made to feel easy':'आसान अनुभव',
  'THE FLYPAY WAY':'FlyPay का तरीका','Small steps.':'छोटे कदम।','Done and dusted.':'काम पूरा।','Pick a service':'सेवा चुनें','Mobile recharge, DTH or one of your household bills.':'मोबाइल रिचार्ज, DTH या घर का कोई बिल।','Add the details':'जानकारी भरें','Enter the number or account you want to pay.':'जिस नंबर या खाते का भुगतान करना है, वह दर्ज करें।','Carry on with your day':'अपने दिन में आगे बढ़ें','Make your payment through FlyPay and you’re done.':'FlyPay से भुगतान करें और काम पूरा।',
  'Everyday essentials':'रोज़मर्रा की ज़रूरतें','Mobile and DTH recharges, BBPS bills and digital banking.':'मोबाइल और DTH रिचार्ज, BBPS बिल और डिजिटल बैंकिंग।','One simple place':'एक आसान जगह','A single platform for the services that keep your day moving.':'आपके दिन को आसान बनाने वाली सेवाएँ एक ही मंच पर।','Contact FlyPay for help with its services.':'FlyPay सेवाओं में सहायता के लिए संपर्क करें।','Services across India':'भारत भर में सेवाएँ','FlyPay describes its digital services as available across India.':'FlyPay के अनुसार उसकी डिजिटल सेवाएँ भारत भर में उपलब्ध हैं।','FLYPAY AT A GLANCE':'एक नज़र में FlyPay','thoughtfully connected.':'सोच-समझकर एक साथ।',
  'THE PEOPLE BEHIND FLYPAY':'FlyPay के संस्थापक','Built with purpose.':'उद्देश्य के साथ निर्मित।','Focused on access.':'आसान पहुँच पर ध्यान।','FlyPay’s founders are Sandeep and Sanjeev. The company’s stated mission is to make digital banking and financial services easier to access.':'FlyPay के संस्थापक Sandeep और Sanjeev हैं। कंपनी का घोषित उद्देश्य डिजिटल बैंकिंग और वित्तीय सेवाओं तक पहुँच आसान बनाना है।','FOUNDER':'संस्थापक',
  'WE’RE ALL EARS':'हम आपकी बात सुनने के लिए हैं','Got a question?':'कोई सवाल है?','We’re right here.':'हम यहीं हैं।','Whether you need a hand or just want to say hello, our team’s happy to hear from you.':'मदद चाहिए या बस बात करनी है—हमारी टीम आपसे सुनने के लिए तैयार है।','Chat on WhatsApp':'WhatsApp पर बात करें','Tell us a little about it':'हमें बताइए','Leave a message and we’ll get back to you.':'संदेश छोड़ें, हम आपसे संपर्क करेंगे।','Your name':'आपका नाम','Email address':'ईमेल पता','Phone number':'फ़ोन नंबर','(optional)':'(वैकल्पिक)',"What's this about?":'किस विषय में?', 'General enquiry':'सामान्य पूछताछ','Recharge or payment':'रिचार्ज या भुगतान','Business partnership':'व्यावसायिक साझेदारी','Something else':'कुछ और','Send us a note':'संदेश भेजें','Your details stay safe with us.':'आपकी जानकारी हमारे पास सुरक्षित है।',
  'Have a wander':'देखें','What we do':'हमारी सेवाएँ','Why FlyPay':'FlyPay क्यों','Need a hand?':'मदद चाहिए?','Email us':'ईमेल करें','Contact FlyPay':'FlyPay से संपर्क करें','WhatsApp us':'WhatsApp करें','Privacy Policy':'गोपनीयता नीति','Terms & Conditions':'नियम और शर्तें','Refund & Cancellation':'रिफंड और कैंसलेशन','All rights reserved.':'सर्वाधिकार सुरक्षित।','India, with care ✳':'भारत के लिए, अपनापन ✳','Call FlyPay':'FlyPay को कॉल करें','ILLUSTRATIVE SERVICE NETWORK':'सेवाओं का चित्रात्मक नेटवर्क'
};

const hiExtra = {
  'Company':'कंपनी','Legal & Support':'कानूनी सहायता','Partner Login':'पार्टनर लॉग इन','Visit our office':'हमारे कार्यालय आएँ','Open in Maps':'मैप में खोलें','A good place to start':'शुरुआत यहीं से करें','Let’s make your day':'आपका दिन बनाएं','a little easier.':'थोड़ा आसान।','Leave us your details and our friendly team will be in touch.':'अपनी जानकारी दें, हमारी टीम आपसे संपर्क करेगी।','Let’s talk':'बात करें','Sending…':'भेज रहे हैं…','Visit flypay.co.in':'flypay.co.in देखें','Mobile recharges':'मोबाइल रिचार्ज','DTH recharges':'DTH रिचार्ज','Top up any prepaid number in moments. Quick, reliable recharges across leading networks.':'कई प्रमुख नेटवर्क पर प्रीपेड नंबर को आसानी से और जल्दी रिचार्ज करें।','Keep the good stuff playing. Renew your DTH service with a simple, seamless payment.':'आसान भुगतान से अपनी DTH सेवा रिन्यू करें और मनोरंजन जारी रखें।','Water, electricity, broadband and more. Settle your everyday household bills in one place.':'पानी, बिजली, ब्रॉडबैंड और अन्य घरेलू बिल एक ही जगह चुकाएँ।','Explore convenient banking services designed to bring helpful financial tools closer.':'उपयोगी वित्तीय सेवाओं तक आसान पहुँच के लिए डिजिटल बैंकिंग विकल्प देखें।','Need help? Contact the FlyPay support team.':'मदद चाहिए? FlyPay सहायता टीम से संपर्क करें।','Your details stay safe with us.':'आपकी जानकारी हमारे पास सुरक्षित है।','All your everyday':'आपके रोज़मर्रा के सभी','payments, together.':'भुगतान, एक साथ।','Secure and reliable services':'सुरक्षित और भरोसेमंद सेवाएँ','Customer support':'ग्राहक सहायता'
};

const hiExtra2 = {
  'Company':'कंपनी','Legal & Support':'कानूनी सहायता','Partner Login':'पार्टनर लॉग इन','Visit our office':'हमारे कार्यालय आएँ','Open in Maps':'मैप में खोलें','Visit flypay.co.in':'flypay.co.in देखें','Mobile recharges':'मोबाइल रिचार्ज','DTH recharges':'DTH रिचार्ज',
  'Top up any prepaid number in moments. Quick, reliable recharges across leading networks.':'कई प्रमुख नेटवर्क पर प्रीपेड नंबर को आसानी से और जल्दी रिचार्ज करें.',
  'Keep the good stuff playing. Renew your DTH service with a simple, seamless payment.':'आसान भुगतान से अपनी DTH सेवा रिन्यू करें और मनोरंजन जारी रखें.',
  'Water, electricity, broadband and more. Settle your everyday household bills in one place.':'पानी, बिजली, ब्रॉडबैंड और अन्य घरेलू बिल एक ही जगह चुकाएँ.',
  'Explore convenient banking services designed to bring helpful financial tools closer.':'उपयोगी वित्तीय सेवाओं तक आसान पहुँच के लिए डिजिटल बैंकिंग विकल्प देखें.',
  'Need help? Contact the FlyPay support team.':'मदद चाहिए? FlyPay सहायता टीम से संपर्क करें.','Your details stay safe with us.':'आपकी जानकारी हमारे पास सुरक्षित है।',
  'Your everyday':'आपके रोज़मर्रा के','payments, together.':'भुगतान, एक साथ।','Secure and reliable services':'सुरक्षित और भरोसेमंद सेवाएँ',
  'Mobile recharge':'मोबाइल रिचार्ज','BBPS bill pay':'BBPS बिल भुगतान','Stay connected':'जुड़े रहें','More to watch':'और मनोरंजन','Bills, all sorted':'बिल आसान','Bank with ease':'आसान बैंकिंग','Made to feel easy':'आसान अनुभव','WE’RE ALL EARS':'हम आपकी बात सुनने के लिए हैं','We’re right here.':'हम यहीं हैं।','Whether you need a hand or just want to say hello, our team’s happy to hear from you.':'मदद चाहिए या बस बात करनी है—हमारी टीम आपसे सुनने के लिए तैयार है।','No big steps. Just three small ones.':'कोई बड़े कदम नहीं। बस तीन छोटे कदम।','Easy as':'इतना आसान','one, two, done.':'एक, दो, और काम पूरा।','Core payment services':'मुख्य भुगतान सेवाएँ','MADE FOR EVERYDAY LIFE':'रोज़मर्रा के लिए','ILLUSTRATIVE SERVICE NETWORK':'सेवाओं का चित्रात्मक नेटवर्क'
};

const hiLegal = {
  'Privacy Policy': 'गोपनीयता नीति', 'Terms & Conditions': 'नियम और शर्तें',
  'Refund & Cancellation': 'रिफंड और रद्दीकरण', 'ON THIS PAGE': 'इस पृष्ठ पर',
  'YOUR INFORMATION, YOUR RIGHTS': 'आपकी जानकारी, आपके अधिकार',
  'Introduction': 'परिचय', 'Definitions': 'परिभाषाएँ',
  'Information Collection and Use': 'जानकारी का संग्रह और उपयोग',
  'Types of Data Collected': 'एकत्र किए गए डेटा के प्रकार',
  'Use of Data': 'डेटा का उपयोग', 'Retention of Data': 'डेटा का संग्रहण',
  'Transfer of Data': 'डेटा का हस्तांतरण', 'Disclosure of Data': 'डेटा का प्रकटीकरण',
  'Security of Data': 'डेटा की सुरक्षा', 'Service Providers': 'सेवा प्रदाता',
  'Analytics': 'विश्लेषण', 'Payments': 'भुगतान', 'Links to Other Sites': 'अन्य वेबसाइटों के लिंक',
  'Changes to This Privacy Policy': 'इस गोपनीयता नीति में बदलाव', 'Contact Us': 'संपर्क करें',
  'Our Digital Services': 'हमारी डिजिटल सेवाएँ', 'Restriction of Use': 'उपयोग पर प्रतिबंध',
  'TERMS AND CONDITIONS:': 'नियम और शर्तें:',
  'Third-Party Links on Our Website and Mobile App': 'वेबसाइट और मोबाइल ऐप पर तृतीय-पक्ष लिंक',
  'Your Rights': 'आपके अधिकार', 'Your Duty': 'आपकी जिम्मेदारी',
  'Violation of Terms and Conditions': 'नियम और शर्तों का उल्लंघन',
  'Unused Balance Clause': 'अप्रयुक्त शेष राशि', 'Return and Exchange': 'वापसी और विनिमय',
  'Cancellation': 'रद्दीकरण', 'Note': 'ध्यान दें',
  'Find in policy': 'नीति में खोजें', 'Find in privacy policy': 'गोपनीयता नीति में खोजें',
  'Clear search': 'खोज साफ़ करें', 'Back to FlyPay': 'FlyPay पर वापस जाएँ',
  'Expand all': 'सभी खोलें', 'Collapse all': 'सभी समेटें', 'sections': 'अनुभाग', 'matching': 'मिलान',
  'Questions about your data?': 'अपने डेटा के बारे में प्रश्न हैं?'
  , 'Contact FlyPay directly': 'FlyPay से सीधे संपर्क करें',
  'Your message will be handled through FlyPay’s official contact form.': 'आपका संदेश FlyPay के आधिकारिक संपर्क फ़ॉर्म से भेजा जाएगा।',
  'Use FlyPay’s secure contact page to send your enquiry directly to their team.': 'अपना संदेश सीधे FlyPay टीम तक भेजने के लिए आधिकारिक संपर्क पृष्ठ का उपयोग करें।',
  'Open official contact form': 'आधिकारिक संपर्क फ़ॉर्म खोलें',
  'You’ll continue on the official FlyPay website.': 'अब FlyPay की आधिकारिक वेबसाइट खुलेगी।'
};

export function LanguageProvider({ children }) {
  const [language,setLanguage]=useState(()=>localStorage.getItem('flypay-language')||'en');
  const toggleLanguage=()=>setLanguage(current=>{const next=current==='en'?'hi':'en';localStorage.setItem('flypay-language',next);document.documentElement.lang=next;return next;});
  const t=value=>language==='hi'?(hiLegal[value]||hi[value]||hiExtra[value]||hiExtra2[value]||value):value;
  return <LanguageContext.Provider value={{language,t,toggleLanguage}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){return useContext(LanguageContext)||{language:'en',t:value=>value,toggleLanguage:()=>{}};}
