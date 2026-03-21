// Clean and Organized Government Data System
// ============================================

class CleanGovernmentDataManager {
    constructor() {
        this.countries = new Map();
        this.initializeCleanData();
    }

    initializeCleanData() {
        // Clean and organized country data
        const countriesData = {
            'saudi-arabia': {
                names: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                flags: { ar: '🇸🇦', en: '🇸🇦' },
                codes: ['SA', 'SAU', 'السعودية', 'Saudi Arabia', 'KSA'],
                basicInfo: {
                    capital: { ar: 'الرياض', en: 'Riyadh' },
                    region: { ar: 'الشرق الأوسط', en: 'Middle East' },
                    population: { ar: '34.8 مليون نسمة', en: '34.8 million' },
                    currency: { ar: 'ريال سعودي', en: 'Saudi Riyal' },
                    language: { ar: 'العربية', en: 'Arabic' },
                    gdp: { ar: '1.1 تريليون دولار', en: '$1.1 trillion' },
                    gdpPerCapita: { ar: '31,300 دولار', en: '$31,300' }
                },
                economy: {
                    gdp: { ar: '1.1 تريليون دولار', en: '$1.1 trillion' },
                    gdpGrowth: { ar: '2.4%', en: '2.4%' },
                    gdpPerCapita: { ar: '31,300 دولار', en: '$31,300' },
                    inflation: { ar: '2.7%', en: '2.7%' },
                    unemployment: { ar: '5.7%', en: '5.7%' },
                    tradeBalance: { ar: '167 مليار دولار', en: '$167 billion' },
                    exports: { ar: '323 مليار دولار', en: '$323 billion' },
                    imports: { ar: '156 مليار دولار', en: '$156 billion' },
                    foreignReserves: { ar: '442 مليار دولار', en: '$442 billion' },
                    publicDebt: { ar: '25% من الناتج المحلي', en: '25% of GDP' },
                    creditRating: { ar: 'A+', en: 'A+' },
                    topExports: [
                        { product: { ar: 'النفط الخام', en: 'Crude Oil' }, value: { ar: '182 مليار دولار', en: '$182 billion' }, percentage: '56.3%' },
                        { product: { ar: 'البترول المكرر', en: 'Refined Petroleum' }, value: { ar: '45 مليار دولار', en: '$45 billion' }, percentage: '13.9%' },
                        { product: { ar: 'المواد الكيميائية', en: 'Chemicals' }, value: { ar: '22 مليار دولار', en: '$22 billion' }, percentage: '6.8%' },
                        { product: { ar: 'البلاستيك', en: 'Plastics' }, value: { ar: '18 مليار دولار', en: '$18 billion' }, percentage: '5.6%' },
                        { product: { ar: 'الغاز الطبيعي', en: 'Natural Gas' }, value: { ar: '15 مليار دولار', en: '$15 billion' }, percentage: '4.6%' }
                    ],
                    topImports: [
                        { product: { ar: 'الآلات', en: 'Machinery' }, value: { ar: '35 مليار دولار', en: '$35 billion' }, percentage: '22.4%' },
                        { product: { ar: 'المركبات', en: 'Vehicles' }, value: { ar: '28 مليار دولار', en: '$28 billion' }, percentage: '17.9%' },
                        { product: { ar: 'المعدات الكهربائية', en: 'Electrical Equipment' }, value: { ar: '22 مليار دولار', en: '$22 billion' }, percentage: '14.1%' },
                        { product: { ar: 'المعادن', en: 'Metals' }, value: { ar: '18 مليار دولار', en: '$18 billion' }, percentage: '11.5%' },
                        { product: { ar: 'المواد الغذائية', en: 'Food Products' }, value: { ar: '15 مليار دولار', en: '$15 billion' }, percentage: '9.6%' }
                    ],
                    tradingPartners: [
                        { country: { ar: 'الصين', en: 'China' }, trade: { ar: '65 مليار دولار', en: '$65 billion' }, type: 'export' },
                        { country: { ar: 'الهند', en: 'India' }, trade: { ar: '42 مليار دولار', en: '$42 billion' }, type: 'export' },
                        { country: { ar: 'اليابان', en: 'Japan' }, trade: { ar: '38 مليار دولار', en: '$38 billion' }, type: 'export' },
                        { country: { ar: 'الولايات المتحدة', en: 'United States' }, trade: { ar: '28 مليار دولار', en: '$28 billion' }, type: 'import' },
                        { country: { ar: 'ألمانيا', en: 'Germany' }, trade: { ar: '22 مليار دولار', en: '$22 billion' }, type: 'import' }
                    ]
                },
                security: {
                    militarySpending: { ar: '69.1 مليار دولار', en: '$69.1 billion' },
                    militarySpendingPercentage: { ar: '8.4% من الناتج المحلي', en: '8.4% of GDP' },
                    activePersonnel: { ar: '225,000', en: '225,000' },
                    reservePersonnel: { ar: '200,000', en: '200,000' },
                    defenseBudget: { ar: '52 مليار دولار', en: '$52 billion' },
                    securityForces: { ar: '470,000', en: '470,000' },
                    terrorismIndex: { ar: '4.15 (منخفض)', en: '4.15 (Low)' },
                    peaceIndex: { ar: '2.04', en: '2.04' },
                    cyberSecurity: { ar: 'متقدم', en: 'Advanced' },
                    borderSecurity: { ar: 'عالي جداً', en: 'Very High' },
                    internalSecurity: { ar: 'ممتاز', en: 'Excellent' },
                    intelligenceAgencies: [
                        { name: { ar: 'رئاسة استخبارات الدولة', en: 'General Intelligence Presidency' }, director: { ar: 'خالد الحميدان', en: 'Khalid Al-Humaidan' }, role: { ar: 'استخبارات خارجية', en: 'Foreign Intelligence' } },
                        { name: { ar: 'المباحث العامة', en: 'General Investigation Directorate' }, director: { ar: 'عبدالعزيز الدوسري', en: 'Abdulaziz Al-Dossari' }, role: { ar: 'استخبارات داخلية', en: 'Internal Intelligence' } },
                        { name: { ar: 'القوات الخاصة للأمن', en: 'Special Security Forces' }, director: { ar: 'محمد السهلي', en: 'Mohammed Al-Sahli' }, role: { ar: 'عمليات خاصة', en: 'Special Operations' } }
                    ],
                    militaryBranches: [
                        { name: { ar: 'القوات البرية الملكية السعودية', en: 'Royal Saudi Land Forces' }, commander: { ar: 'فهد بن تركي بن عبدالله', en: 'Fahd bin Turki bin Abdullah' }, personnel: { ar: '75,000', en: '75,000' } },
                        { name: { ar: 'القوات الجوية الملكية السعودية', en: 'Royal Saudi Air Force' }, commander: { ar: 'طلق بن عبدالعزيز', en: 'Turki bin Abdulaziz' }, personnel: { ar: '20,000', en: '20,000' } },
                        { name: { ar: 'القوات البحرية الملكية السعودية', en: 'Royal Saudi Naval Forces' }, commander: { ar: 'فهد بن عبدالله', en: 'Fahd bin Abdullah' }, personnel: { ar: '15,500', en: '15,500' } },
                        { name: { ar: 'قوة الدفاع الجوي الملكي السعودي', en: 'Royal Saudi Air Defense Forces' }, commander: { ar: 'محمد بن شاهر', en: 'Mohammed bin Shaher' }, personnel: { ar: '4,000', en: '4,000' } }
                    ],
                    strategicPartnerships: [
                        { country: { ar: 'الولايات المتحدة', en: 'United States' }, type: { ar: 'تحالف استراتيجي', en: 'Strategic Alliance' }, since: { ar: '1945', en: '1945' } },
                        { country: { ar: 'المملكة المتحدة', en: 'United Kingdom' }, type: { ar: 'شراكة دفاعية', en: 'Defense Partnership' }, since: { ar: '1927', en: '1927' } },
                        { country: { ar: 'فرنسا', en: 'France' }, type: { ar: 'تعاون عسكري', en: 'Military Cooperation' }, since: { ar: '1965', en: '1965' } },
                        { country: { ar: 'الصين', en: 'China' }, type: { ar: 'شراكة اقتصادية', en: 'Economic Partnership' }, since: { ar: '1990', en: '1990' } }
                    ]
                },
                leadership: [
                    {
                        title: { ar: 'الملك', en: 'King' },
                        name: { ar: 'سلمان بن عبدالعزيز آل سعود', en: 'Salman bin Abdulaziz Al Saud' },
                        position: { ar: 'ملك المملكة العربية السعودية', en: 'King of Saudi Arabia' },
                        term: { ar: 'منذ 2015', en: 'Since 2015' },
                        phone: '+966-11-4055555',
                        email: 'info@royalcourt.gov.sa',
                        photo: 'https://example.com/king-salman.jpg'
                    },
                    {
                        title: { ar: 'ولي العهد', en: 'Crown Prince' },
                        name: { ar: 'محمد بن سلمان', en: 'Mohammed bin Salman' },
                        position: { ar: 'ولي العهد رئيس مجلس الوزراء', en: 'Crown Prince, Prime Minister' },
                        term: { ar: 'منذ 2017', en: 'Since 2017' },
                        phone: '+966-11-4055555',
                        email: 'info@royalcourt.gov.sa',
                        photo: 'https://example.com/mbs.jpg'
                    }
                ],
                ministries: [
                    {
                        name: { ar: 'وزارة الخارجية', en: 'Ministry of Foreign Affairs' },
                        minister: { ar: 'الأمير فيصل بن فرحان آل سعود', en: 'Prince Faisal bin Farhan Al Saud' },
                        responsibility: { ar: 'العلاقات الدبلوماسية', en: 'Diplomatic Relations' },
                        phone: '+966-12-678-8888',
                        email: 'info@mofa.gov.sa',
                        website: 'https://www.mofa.gov.sa',
                        address: { ar: 'الرياض', en: 'Riyadh' }
                    },
                    {
                        name: { ar: 'وزارة المالية', en: 'Ministry of Finance' },
                        minister: { ar: 'محمد بن عبدالله الجدعان', en: 'Mohammed bin Abdullah Al-Jadaan' },
                        responsibility: { ar: 'الإدارة المالية', en: 'Financial Management' },
                        phone: '+966-11-405-5555',
                        email: 'info@mof.gov.sa',
                        website: 'https://www.mof.gov.sa',
                        address: { ar: 'الرياض', en: 'Riyadh' }
                    },
                    {
                        name: { ar: 'وزارة الاستثمار', en: 'Ministry of Investment' },
                        minister: { ar: 'خالد بن عبدالعزيز الفالح', en: 'Khalid bin Abdulaziz Al-Falih' },
                        responsibility: { ar: 'ترويج الاستثمار', en: 'Investment Promotion' },
                        phone: '+966-12-658-8888',
                        email: 'info@invest.gov.sa',
                        website: 'https://invest.gov.sa',
                        address: { ar: 'الرياض', en: 'Riyadh' }
                    },
                    {
                        name: { ar: 'وزارة الطاقة', en: 'Ministry of Energy' },
                        minister: { ar: 'الأمير عبدالعزيز بن سلمان', en: 'Prince Abdulaziz bin Salman' },
                        responsibility: { ar: 'قطاع الطاقة', en: 'Energy Sector' },
                        phone: '+966-11-405-5555',
                        email: 'info@moenergy.gov.sa',
                        website: 'https://www.moenergy.gov.sa',
                        address: { ar: 'الرياض', en: 'Riyadh' }
                    },
                    {
                        name: { ar: 'وزارة الصناعة', en: 'Ministry of Industry' },
                        minister: { ar: 'بندر بن إبراهيم الخريف', en: 'Bandar bin Ibrahim Al-Khorayef' },
                        responsibility: { ar: 'التنمية الصناعية', en: 'Industrial Development' },
                        phone: '+966-11-405-5555',
                        email: 'info@moie.gov.sa',
                        website: 'https://www.moie.gov.sa',
                        address: { ar: 'الرياض', en: 'Riyadh' }
                    },
                    {
                        name: { ar: 'وزارة التجارة', en: 'Ministry of Commerce' },
                        minister: { ar: 'مجيد بن عبدالعزيز القصبي', en: 'Majid bin Abdulaziz Al-Qasabi' },
                        responsibility: { ar: 'التجارة الداخلية والخارجية', en: 'Domestic and Foreign Trade' },
                        phone: '+966-11-405-5555',
                        email: 'info@commerce.gov.sa',
                        website: 'https://www.commerce.gov.sa',
                        address: { ar: 'الرياض', en: 'Riyadh' }
                    }
                ],
                executiveAgencies: [
                    {
                        name: { ar: 'هيئة تطوير الرياض', en: 'Royal Commission for Riyadh City' },
                        director: { ar: 'الأمير محمد بن عبدالرحمن', en: 'Prince Mohammed bin Abdulrahman' },
                        responsibility: { ar: 'تطوير مدينة الرياض', en: 'Development of Riyadh City' },
                        phone: '+966-1-4055555',
                        email: 'info@rcrc.gov.sa',
                        website: 'https://www.rcrc.gov.sa',
                        established: { ar: '1974', en: '1974' }
                    },
                    {
                        name: { ar: 'هيئة تطوير مكة المكرمة', en: 'Royal Commission for Makkah and Holy Sites' },
                        director: { ar: 'الأمير خالد بن فيصل', en: 'Prince Khalid bin Faisal' },
                        responsibility: { ar: 'تطوير مكة المكرمة والمشاعر المقدسة', en: 'Development of Makkah and Holy Sites' },
                        phone: '+966-12-5400000',
                        email: 'info@rcmoh.gov.sa',
                        website: 'https://www.rcmoh.gov.sa',
                        established: { ar: '2019', en: '2019' }
                    },
                    {
                        name: { ar: 'هيئة تطوير العلا', en: 'Royal Commission for Al-Ula' },
                        director: { ar: 'الأمير بدر بن عبدالله بن فرحان', en: 'Prince Badr bin Abdullah bin Farhan' },
                        responsibility: { ar: 'تطوير محافظة العلا', en: 'Development of Al-Ula Governorate' },
                        phone: '+966-14-4240000',
                        email: 'info@rcu.gov.sa',
                        website: 'https://www.rcu.gov.sa',
                        established: { ar: '2017', en: '2017' }
                    }
                ],
                embassies: [
                    {
                        name: { ar: 'سفارة المملكة العربية السعودية في واشنطن', en: 'Embassy of Saudi Arabia in Washington' },
                        ambassador: { ar: 'الأميرة ريما بنت بندر بن سلطان', en: 'Princess Reema bint Bandar bin Sultan' },
                        address: { ar: '601 New Hampshire Ave NW, Washington, DC 20037', en: '601 New Hampshire Ave NW, Washington, DC 20037' },
                        phone: '+1-202-944-3125',
                        email: 'info@saudiembassy.net',
                        website: 'https://www.saudiembassy.net',
                        country: { ar: 'الولايات المتحدة الأمريكية', en: 'United States' }
                    },
                    {
                        name: { ar: 'سفارة المملكة العربية السعودية في لندن', en: 'Embassy of Saudi Arabia in London' },
                        ambassador: { ar: 'الأمير خالد بن بندر بن عبدالعزيز', en: 'Prince Khalid bin Bandar bin Abdulaziz' },
                        address: { ar: '30 Charles Street, London W1J 5DG', en: '30 Charles Street, London W1J 5DG' },
                        phone: '+44-20-7917-3000',
                        email: 'info@saudiembassy.org.uk',
                        website: 'https://www.saudiembassy.org.uk',
                        country: { ar: 'المملكة المتحدة', en: 'United Kingdom' }
                    },
                    {
                        name: { ar: 'سفارة المملكة العربية السعودية في باريس', en: 'Embassy of Saudi Arabia in Paris' },
                        ambassador: { ar: 'فهد بن عبدالرحمن الرويس', en: 'Fahad bin Abdulrahman Alruwais' },
                        address: { ar: '1 Rue de la Faisanderie, 75116 Paris', en: '1 Rue de la Faisanderie, 75116 Paris' },
                        phone: '+33-1-53-93-15-00',
                        email: 'ambassade.paris@mofa.gov.sa',
                        website: 'https://www.mofa.gov.sa/sites/default/files/2021-01/embassy_paris_fr.pdf',
                        country: { ar: 'فرنسا', en: 'France' }
                    }
                ],
                consulates: [
                    {
                        name: { ar: 'القنصلية العامة السعودية في نيويورك', en: 'Consulate General of Saudi Arabia in New York' },
                        consul: { ar: 'نايف بن فهد الفهيد', en: 'Naif bin Fahad Al-Fuhaid' },
                        address: { ar: '866 Second Avenue, New York, NY 10022', en: '866 Second Avenue, New York, NY 10022' },
                        phone: '+1-212-755-0940',
                        email: 'cgnyc@mofa.gov.sa',
                        website: 'https://www.mofa.gov.sa/sites/default/files/2021-01/new_york.pdf',
                        country: { ar: 'الولايات المتحدة الأمريكية', en: 'United States' },
                        city: { ar: 'نيويورك', en: 'New York' }
                    },
                    {
                        name: { ar: 'القنصلية العامة السعودية في لوس أنجلوس', en: 'Consulate General of Saudi Arabia in Los Angeles' },
                        consul: { ar: 'نايف بن فهد الفهيد', en: 'Naif bin Fahad Al-Fuhaid' },
                        address: { ar: '825 Wilshire Blvd., Suite 800, Los Angeles, CA 90017', en: '825 Wilshire Blvd., Suite 800, Los Angeles, CA 90017' },
                        phone: '+1-213-629-7777',
                        email: 'cgla@mofa.gov.sa',
                        website: 'https://www.mofa.gov.sa/sites/default/files/2021-01/los_angeles.pdf',
                        country: { ar: 'الولايات المتحدة الأمريكية', en: 'United States' },
                        city: { ar: 'لوس أنجلوس', en: 'Los Angeles' }
                    }
                ],
                commercialOffices: [
                    {
                        name: { ar: 'الملحقية التجارية السعودية في واشنطن', en: 'Saudi Commercial Office in Washington' },
                        director: { ar: 'الدكتور عبدالله بن أحمد', en: 'Dr. Abdullah bin Ahmed' },
                        address: { ar: '601 New Hampshire Ave NW, Washington, DC 20037', en: '601 New Hampshire Ave NW, Washington, DC 20037' },
                        phone: '+1-202-944-3125',
                        email: 'commercial.washington@saudi-embassy.net',
                        website: 'https://www.saudi-embassy.net/commercial-office',
                        country: { ar: 'الولايات المتحدة الأمريكية', en: 'United States' },
                        services: { ar: 'دعم التجارة والاستثمار', en: 'Trade and Investment Support' }
                    },
                    {
                        name: { ar: 'الملحقية التجارية السعودية في لندن', en: 'Saudi Commercial Office in London' },
                        director: { ar: 'الدكتور خالد بن محمد', en: 'Dr. Khalid bin Mohammed' },
                        address: { ar: '30 Charles Street, London W1J 5DG', en: '30 Charles Street, London W1J 5DG' },
                        phone: '+44-20-7917-3000',
                        email: 'commercial.london@saudiembassy.org.uk',
                        website: 'https://www.saudiembassy.org.uk/commercial-office',
                        country: { ar: 'المملكة المتحدة', en: 'United Kingdom' },
                        services: { ar: 'دعم التجارة والاستثمار', en: 'Trade and Investment Support' }
                    }
                ]
            },
            'united-states': {
                names: { ar: 'الولايات المتحدة الأمريكية', en: 'United States' },
                flags: { ar: '🇺🇸', en: '🇺🇸' },
                codes: ['US', 'USA', 'أمريكا', 'United States', 'America'],
                basicInfo: {
                    capital: { ar: 'واشنطن العاصمة', en: 'Washington D.C.' },
                    region: { ar: 'أمريكا الشمالية', en: 'North America' },
                    population: { ar: '331 مليون نسمة', en: '331 million' },
                    currency: { ar: 'الدولار الأمريكي', en: 'US Dollar' },
                    language: { ar: 'الإنجليزية', en: 'English' },
                    gdp: { ar: '25.5 تريليون دولار', en: '$25.5 trillion' },
                    gdpPerCapita: { ar: '76,300 دولار', en: '$76,300' }
                },
                economy: {
                    gdp: { ar: '25.5 تريليون دولار', en: '$25.5 trillion' },
                    gdpGrowth: { ar: '2.1%', en: '2.1%' },
                    gdpPerCapita: { ar: '76,300 دولار', en: '$76,300' },
                    inflation: { ar: '3.4%', en: '3.4%' },
                    unemployment: { ar: '3.6%', en: '3.6%' },
                    tradeBalance: { ar: '-945 مليار دولار', en: '-$945 billion' },
                    exports: { ar: '2.1 تريليون دولار', en: '$2.1 trillion' },
                    imports: { ar: '3.1 تريليون دولار', en: '$3.1 trillion' },
                    foreignReserves: { ar: '241 مليار دولار', en: '$241 billion' },
                    publicDebt: { ar: '121% من الناتج المحلي', en: '121% of GDP' },
                    creditRating: { ar: 'AA+', en: 'AA+' },
                    topExports: [
                        { product: { ar: 'الطائرات', en: 'Aircraft' }, value: { ar: '153 مليار دولار', en: '$153 billion' }, percentage: '7.3%' },
                        { product: { ar: 'السيارات', en: 'Vehicles' }, value: { ar: '136 مليار دولار', en: '$136 billion' }, percentage: '6.5%' },
                        { product: { ar: 'المعدات الطبية', en: 'Medical Equipment' }, value: { ar: '98 مليار دولار', en: '$98 billion' }, percentage: '4.7%' },
                        { product: { ar: 'البتروكيماويات', en: 'Petrochemicals' }, value: { ar: '85 مليار دولار', en: '$85 billion' }, percentage: '4.0%' },
                        { product: { ar: 'الأسلحة', en: 'Weapons' }, value: { ar: '78 مليار دولار', en: '$78 billion' }, percentage: '3.7%' }
                    ],
                    topImports: [
                        { product: { ar: 'السيارات', en: 'Vehicles' }, value: { ar: '195 مليار دولار', en: '$195 billion' }, percentage: '6.3%' },
                        { product: { ar: 'الإلكترونيات', en: 'Electronics' }, value: { ar: '162 مليار دولار', en: '$162 billion' }, percentage: '5.2%' },
                        { product: { ar: 'الأدوية', en: 'Pharmaceuticals' }, value: { ar: '138 مليار دولار', en: '$138 billion' }, percentage: '4.4%' },
                        { product: { ar: 'الملابس', en: 'Clothing' }, value: { ar: '115 مليار دولار', en: '$115 billion' }, percentage: '3.7%' },
                        { product: { ar: 'الأثاث', en: 'Furniture' }, value: { ar: '98 مليار دولار', en: '$98 billion' }, percentage: '3.2%' }
                    ],
                    tradingPartners: [
                        { country: { ar: 'الصين', en: 'China' }, trade: { ar: '561 مليار دولار', en: '$561 billion' }, type: 'import' },
                        { country: { ar: 'كندا', en: 'Canada' }, trade: { ar: '614 مليار دولار', en: '$614 billion' }, type: 'export' },
                        { country: { ar: 'المكسيك', en: 'Mexico' }, trade: { ar: '459 مليار دولار', en: '$459 billion' }, type: 'export' },
                        { country: { ar: 'اليابان', en: 'Japan' }, trade: { ar: '218 مليار دولار', en: '$218 billion' }, type: 'export' },
                        { country: { ar: 'ألمانيا', en: 'Germany' }, trade: { ar: '195 مليار دولار', en: '$195 billion' }, type: 'export' }
                    ]
                },
                security: {
                    militarySpending: { ar: '816 مليار دولار', en: '$816 billion' },
                    militarySpendingPercentage: { ar: '3.5% من الناتج المحلي', en: '3.5% of GDP' },
                    activePersonnel: { ar: '1,388,000', en: '1,388,000' },
                    reservePersonnel: { ar: '844,950', en: '844,950' },
                    defenseBudget: { ar: '778 مليار دولار', en: '$778 billion' },
                    securityForces: { ar: '2,232,950', en: '2,232,950' },
                    terrorismIndex: { ar: '3.61 (منخفض)', en: '3.61 (Low)' },
                    peaceIndex: { ar: '2.23', en: '2.23' },
                    cyberSecurity: { ar: 'متقدم جداً', en: 'Very Advanced' },
                    borderSecurity: { ar: 'عالي', en: 'High' },
                    internalSecurity: { ar: 'جيد جداً', en: 'Very Good' },
                    intelligenceAgencies: [
                        { name: { ar: 'وكالة المخابرات المركزية', en: 'Central Intelligence Agency' }, director: { ar: 'ويليام بيرنز', en: 'William Burns' }, role: { ar: 'استخبارات خارجية', en: 'Foreign Intelligence' } },
                        { name: { ar: 'مكتب التحقيقات الفيدرالي', en: 'Federal Bureau of Investigation' }, director: { ar: 'كريستوفر راي', en: 'Christopher Wray' }, role: { ar: 'استخبارات داخلية', en: 'Internal Intelligence' } },
                        { name: { ar: 'وكالة الأمن القومي', en: 'National Security Agency' }, director: { ar: 'تيموثي هاف', en: 'Timothy Haugh' }, role: { ar: 'أمن سيبراني', en: 'Cyber Security' } }
                    ],
                    militaryBranches: [
                        { name: { ar: 'جيش الولايات المتحدة', en: 'United States Army' }, commander: { ar: 'راندى جورج', en: 'Randy George' }, personnel: { ar: '485,000', en: '485,000' } },
                        { name: { ar: 'البحرية الأمريكية', en: 'United States Navy' }, commander: { ar: 'مايكل غيلدي', en: 'Michael Gilday' }, personnel: { ar: '342,000', en: '342,000' } },
                        { name: { ar: 'القوات الجوية الأمريكية', en: 'United States Air Force' }, commander: { ar: 'ديفيد ألفين', en: 'David Allvin' }, personnel: { ar: '326,000', en: '326,000' } },
                        { name: { ar: 'قوات مشاة البحرية', en: 'United States Marine Corps' }, commander: { ar: 'إريك سميث', en: 'Eric Smith' }, personnel: { ar: '177,000', en: '177,000' } }
                    ],
                    strategicPartnerships: [
                        { country: { ar: 'حلف شمال الأطلسي', en: 'NATO' }, type: { ar: 'تحالف عسكري', en: 'Military Alliance' }, since: { ar: '1949', en: '1949' } },
                        { country: { ar: 'اليابان', en: 'Japan' }, type: { ar: 'تحالف أمني', en: 'Security Alliance' }, since: { ar: '1951', en: '1951' } },
                        { country: { ar: 'كوريا الجنوبية', en: 'South Korea' }, type: { ar: 'تحالف دفاعي', en: 'Defense Alliance' }, since: { ar: '1953', en: '1953' } },
                        { country: { ar: 'أستراليا', en: 'Australia' }, type: { ar: 'شراكة استراتيجية', en: 'Strategic Partnership' }, since: { ar: '1951', en: '1951' } }
                    ]
                },
                leadership: [
                    {
                        title: { ar: 'الرئيس', en: 'President' },
                        name: { ar: 'جو بايدن', en: 'Joe Biden' },
                        position: { ar: 'رئيس الولايات المتحدة', en: 'President of the United States' },
                        term: { ar: 'منذ 2021', en: 'Since 2021' },
                        phone: '+1-202-456-1111',
                        email: 'info@whitehouse.gov',
                        photo: 'https://example.com/biden.jpg'
                    },
                    {
                        title: { ar: 'نائب الرئيس', en: 'Vice President' },
                        name: { ar: 'كامالا هاريس', en: 'Kamala Harris' },
                        position: { ar: 'نائبة رئيس الولايات المتحدة', en: 'Vice President of the United States' },
                        term: { ar: 'منذ 2021', en: 'Since 2021' },
                        phone: '+1-202-456-1111',
                        email: 'info@whitehouse.gov',
                        photo: 'https://example.com/harris.jpg'
                    }
                ],
                ministries: [
                    {
                        name: { ar: 'وزارة الخارجية', en: 'Department of State' },
                        minister: { ar: 'أنتوني بلينكن', en: 'Antony Blinken' },
                        responsibility: { ar: 'العلاقات الخارجية', en: 'Foreign Relations' },
                        phone: '+1-202-647-6575',
                        email: 'feedback@state.gov',
                        website: 'https://www.state.gov',
                        address: { ar: 'واشنطن العاصمة', en: 'Washington D.C.' }
                    },
                    {
                        name: { ar: 'وزارة الخزانة', en: 'Department of Treasury' },
                        minister: { ar: 'جانيت يلين', en: 'Janet Yellen' },
                        responsibility: { ar: 'السياسة المالية', en: 'Financial Policy' },
                        phone: '+1-202-622-2000',
                        email: 'treasury@treasury.gov',
                        website: 'https://www.treasury.gov',
                        address: { ar: 'واشنطن العاصمة', en: 'Washington D.C.' }
                    }
                ],
                executiveAgencies: [
                    {
                        name: { ar: 'وكالة المخابرات المركزية', en: 'Central Intelligence Agency' },
                        director: { ar: 'ويليام بيرنز', en: 'William Burns' },
                        responsibility: { ar: 'جمع المخابرات', en: 'Intelligence Gathering' },
                        phone: '+1-703-713-0000',
                        email: 'info@cia.gov',
                        website: 'https://www.cia.gov',
                        established: { ar: '1947', en: '1947' }
                    },
                    {
                        name: { ar: 'وكالة حماية البيئة', en: 'Environmental Protection Agency' },
                        director: { ar: 'مايكل ريغان', en: 'Michael Regan' },
                        responsibility: { ar: 'حماية البيئة', en: 'Environmental Protection' },
                        phone: '+1-202-564-4700',
                        email: 'info@epa.gov',
                        website: 'https://www.epa.gov',
                        established: { ar: '1970', en: '1970' }
                    }
                ],
                embassies: [
                    {
                        name: { ar: 'سفارة الولايات المتحدة في الرياض', en: 'U.S. Embassy in Riyadh' },
                        ambassador: { ar: 'مايكل راتني', en: 'Michael Ratney' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-1300',
                        email: 'RiyadhEmbassy@state.gov',
                        website: 'https://sa.usembassy.gov',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' }
                    }
                ],
                consulates: [
                    {
                        name: { ar: 'القنصلية الأمريكية في جدة', en: 'U.S. Consulate General in Jeddah' },
                        consul: { ar: 'فاراز قريشي', en: 'Faraz Qureshi' },
                        address: { ar: 'شارع الملك فهد, جدة', en: 'King Fahd Street, Jeddah' },
                        phone: '+966-12-667-0000',
                        email: 'JeddahCG@state.gov',
                        website: 'https://sa.usembassy.gov/jeddah',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        city: { ar: 'جدة', en: 'Jeddah' }
                    }
                ],
                commercialOffices: [
                    {
                        name: { ar: 'المكتب التجاري الأمريكي في الرياض', en: 'U.S. Commercial Service in Riyadh' },
                        director: { ar: 'روبرت وولاس', en: 'Robert Wallace' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-1300',
                        email: 'RiyadhOffice@mail.doc.gov',
                        website: 'https://www.trade.gov/ Riyadh',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        services: { ar: 'دعم التجارة الأمريكية', en: 'U.S. Trade Support' }
                    }
                ]
            },
            'china': {
                names: { ar: 'الصين', en: 'China' },
                flags: { ar: '🇨🇳', en: '🇨🇳' },
                codes: ['CN', 'CHN', 'الصين', 'China'],
                basicInfo: {
                    capital: { ar: 'بكين', en: 'Beijing' },
                    region: { ar: 'شرق آسيا', en: 'East Asia' },
                    population: { ar: '1.4 مليار نسمة', en: '1.4 billion' },
                    currency: { ar: 'اليوان الصيني', en: 'Chinese Yuan' },
                    language: { ar: 'الصينية', en: 'Chinese' },
                    gdp: { ar: '17.7 تريليون دولار', en: '$17.7 trillion' },
                    gdpPerCapita: { ar: '12,500 دولار', en: '$12,500' }
                },
                economy: {
                    gdp: { ar: '17.7 تريليون دولار', en: '$17.7 trillion' },
                    gdpGrowth: { ar: '5.2%', en: '5.2%' },
                    gdpPerCapita: { ar: '12,500 دولار', en: '$12,500' },
                    inflation: { ar: '2.0%', en: '2.0%' },
                    unemployment: { ar: '5.2%', en: '5.2%' },
                    tradeBalance: { ar: '676 مليار دولار', en: '$676 billion' },
                    exports: { ar: '3.6 تريليون دولار', en: '$3.6 trillion' },
                    imports: { ar: '2.9 تريليون دولار', en: '$2.9 trillion' },
                    foreignReserves: { ar: '3.2 تريليون دولار', en: '$3.2 trillion' },
                    publicDebt: { ar: '68% من الناتج المحلي', en: '68% of GDP' },
                    creditRating: { ar: 'A+', en: 'A+' },
                    topExports: [
                        { product: { ar: 'الإلكترونيات', en: 'Electronics' }, value: { ar: '962 مليار دولار', en: '$962 billion' }, percentage: '26.7%' },
                        { product: { ar: 'الآلات', en: 'Machinery' }, value: { ar: '758 مليار دولار', en: '$758 billion' }, percentage: '21.1%' },
                        { product: { ar: 'المنسوجات', en: 'Textiles' }, value: { ar: '286 مليار دولار', en: '$286 billion' }, percentage: '7.9%' },
                        { product: { ar: 'المعدات الكهربائية', en: 'Electrical Equipment' }, value: { ar: '234 مليار دولار', en: '$234 billion' }, percentage: '6.5%' },
                        { product: { ar: 'الفولاذ', en: 'Steel' }, value: { ar: '198 مليار دولار', en: '$198 billion' }, percentage: '5.5%' }
                    ],
                    topImports: [
                        { product: { ar: 'النفط الخام', en: 'Crude Oil' }, value: { ar: '325 مليار دولار', en: '$325 billion' }, percentage: '11.2%' },
                        { product: { ar: 'الدوائر المتكاملة', en: 'Integrated Circuits' }, value: { ar: '278 مليار دولار', en: '$278 billion' }, percentage: '9.6%' },
                        { product: { ar: 'الفحم', en: 'Coal' }, value: { ar: '195 مليار دولار', en: '$195 billion' }, percentage: '6.7%' },
                        { product: { ar: 'الغاز الطبيعي', en: 'Natural Gas' }, value: { ar: '168 مليار دولار', en: '$168 billion' }, percentage: '5.8%' },
                        { product: { ar: 'الحبوب', en: 'Grains' }, value: { ar: '145 مليار دولار', en: '$145 billion' }, percentage: '5.0%' }
                    ],
                    tradingPartners: [
                        { country: { ar: 'الولايات المتحدة', en: 'United States' }, trade: { ar: '659 مليار دولار', en: '$659 billion' }, type: 'export' },
                        { country: { ar: 'اليابان', en: 'Japan' }, trade: { ar: '317 مليار دولار', en: '$317 billion' }, type: 'export' },
                        { country: { ar: 'كوريا الجنوبية', en: 'South Korea' }, trade: { ar: '285 مليار دولار', en: '$285 billion' }, type: 'export' },
                        { country: { ar: 'ألمانيا', en: 'Germany' }, trade: { ar: '235 مليار دولار', en: '$235 billion' }, type: 'export' },
                        { country: { ar: 'أستراليا', en: 'Australia' }, trade: { ar: '218 مليار دولار', en: '$218 billion' }, type: 'import' }
                    ]
                },
                security: {
                    militarySpending: { ar: '292 مليار دولار', en: '$292 billion' },
                    militarySpendingPercentage: { ar: '1.7% من الناتج المحلي', en: '1.7% of GDP' },
                    activePersonnel: { ar: '2,035,000', en: '2,035,000' },
                    reservePersonnel: { ar: '510,000', en: '510,000' },
                    defenseBudget: { ar: '252 مليار دولار', en: '$252 billion' },
                    securityForces: { ar: '2,545,000', en: '2,545,000' },
                    terrorismIndex: { ar: '4.52 (منخفض)', en: '4.52 (Low)' },
                    peaceIndex: { ar: '2.15', en: '2.15' },
                    cyberSecurity: { ar: 'متقدم', en: 'Advanced' },
                    borderSecurity: { ar: 'عالي', en: 'High' },
                    internalSecurity: { ar: 'جيد جداً', en: 'Very Good' },
                    intelligenceAgencies: [
                        { name: { ar: 'وزارة أمن الدولة', en: 'Ministry of State Security' }, director: { ar: 'تشانغ هانغ', en: 'Zhang Hang' }, role: { ar: 'استخبارات داخلية وخارجية', en: 'Internal and External Intelligence' } },
                        { name: { ar: 'مديرية الاستخبارات العسكرية', en: 'Military Intelligence Directorate' }, director: { ar: 'ليو تشيانغ', en: 'Liu Qiang' }, role: { ar: 'استخبارات عسكرية', en: 'Military Intelligence' } }
                    ],
                    militaryBranches: [
                        { name: { ar: 'جيش التحرير الشعبي الصيني', en: 'People\'s Liberation Army Ground Force' }, commander: { ar: 'لي زوتشنغ', en: 'Li Zuocheng' }, personnel: { ar: '975,000', en: '975,000' } },
                        { name: { ar: 'البحرية الصينية', en: 'People\'s Liberation Army Navy' }, commander: { ar: 'شينغ تشينغ', en: 'Shen Jinlong' }, personnel: { ar: '260,000', en: '260,000' } },
                        { name: { ar: 'القوات الجوية الصينية', en: 'People\'s Liberation Army Air Force' }, commander: { ar: 'تشانغ يونغ', en: 'Zhang Yong' }, personnel: { ar: '395,000', en: '395,000' } }
                    ],
                    strategicPartnerships: [
                        { country: { ar: 'روسيا', en: 'Russia' }, type: { ar: 'شراكة استراتيجية', en: 'Strategic Partnership' }, since: { ar: '1996', en: '1996' } },
                        { country: { ar: 'باكستان', en: 'Pakistan' }, type: { ar: 'تحالف استراتيجي', en: 'Strategic Alliance' }, since: { ar: '1963', en: '1963' } }
                    ]
                },
                leadership: [
                    {
                        title: { ar: 'الرئيس', en: 'President' },
                        name: { ar: 'شي جين بينغ', en: 'Xi Jinping' },
                        position: { ar: 'رئيس جمهورية الصين الشعبية', en: 'President of the People\'s Republic of China' },
                        term: { ar: 'منذ 2013', en: 'Since 2013' },
                        phone: '+86-10-630-0000',
                        email: 'info@gov.cn',
                        photo: 'https://example.com/xi.jpg'
                    }
                ],
                ministries: [
                    {
                        name: { ar: 'وزارة الخارجية', en: 'Ministry of Foreign Affairs' },
                        minister: { ar: 'وانغ يي', en: 'Wang Yi' },
                        responsibility: { ar: 'العلاقات الخارجية', en: 'Foreign Relations' },
                        phone: '+86-10-6596-0000',
                        email: 'info@mfa.gov.cn',
                        website: 'https://www.mfa.gov.cn',
                        address: { ar: 'بكين', en: 'Beijing' }
                    }
                ],
                executiveAgencies: [
                    {
                        name: { ar: 'وكالة أنباء شينخوا', en: 'Xinhua News Agency' },
                        director: { ar: 'ليو تشيانغ', en: 'Liu Qiang' },
                        responsibility: { ar: 'وكالة الأنباء الرسمية', en: 'Official News Agency' },
                        phone: '+86-10-6307-0000',
                        email: 'info@xinhuanet.com',
                        website: 'https://www.xinhuanet.com',
                        established: { ar: '1931', en: '1931' }
                    }
                ],
                embassies: [
                    {
                        name: { ar: 'سفارة الصين في الرياض', en: 'Embassy of China in Riyadh' },
                        ambassador: { ar: 'تشانغ هونغ', en: 'Zhang Hong' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-483-2122',
                        email: 'saudiarabia@fmprc.gov.cn',
                        website: 'https://www.fmprc.gov.cn',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' }
                    }
                ],
                consulates: [
                    {
                        name: { ar: 'القنصلية الصينية في جدة', en: 'Chinese Consulate General in Jeddah' },
                        consul: { ar: 'تشانغ تشاو', en: 'Zhang Chao' },
                        address: { ar: 'شارع الملك فهد, جدة', en: 'King Fahd Street, Jeddah' },
                        phone: '+966-12-660-0000',
                        email: 'chinaconsul_jeddah@mfa.gov.cn',
                        website: 'https://jeddah.china-consulate.org',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        city: { ar: 'جدة', en: 'Jeddah' }
                    }
                ],
                commercialOffices: [
                    {
                        name: { ar: 'المكتب التجاري الصيني في الرياض', en: 'China Commercial Office in Riyadh' },
                        director: { ar: 'لي وي', en: 'Li Wei' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-483-2122',
                        email: 'riyadh@mofcom.gov.cn',
                        website: 'https://www.mofcom.gov.cn',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        services: { ar: 'دعم التجارة الصينية', en: 'Chinese Trade Support' }
                    }
                ]
            },
            'japan': {
                names: { ar: 'اليابان', en: 'Japan' },
                flags: { ar: '🇯🇵', en: '🇯🇵' },
                codes: ['JP', 'JPN', 'اليابان', 'Japan'],
                basicInfo: {
                    capital: { ar: 'طوكيو', en: 'Tokyo' },
                    region: { ar: 'شرق آسيا', en: 'East Asia' },
                    population: { ar: '125.8 مليون نسمة', en: '125.8 million' },
                    currency: { ar: 'الين الياباني', en: 'Japanese Yen' },
                    language: { ar: 'اليابانية', en: 'Japanese' },
                    gdp: { ar: '4.9 تريليون دولار', en: '$4.9 trillion' },
                    gdpPerCapita: { ar: '39,300 دولار', en: '$39,300' }
                },
                economy: {
                    gdp: { ar: '4.9 تريليون دولار', en: '$4.9 trillion' },
                    gdpGrowth: { ar: '1.8%', en: '1.8%' },
                    gdpPerCapita: { ar: '39,300 دولار', en: '$39,300' },
                    inflation: { ar: '2.5%', en: '2.5%' },
                    unemployment: { ar: '2.4%', en: '2.4%' },
                    tradeBalance: { ar: '-28 مليار دولار', en: '-$28 billion' },
                    exports: { ar: '756 مليار دولار', en: '$756 billion' },
                    imports: { ar: '784 مليار دولار', en: '$784 billion' },
                    foreignReserves: { ar: '1.3 تريليون دولار', en: '$1.3 trillion' },
                    publicDebt: { ar: '263% من الناتج المحلي', en: '263% of GDP' },
                    creditRating: { ar: 'A', en: 'A' },
                    topExports: [
                        { product: { ar: 'السيارات', en: 'Vehicles' }, value: { ar: '158 مليار دولار', en: '$158 billion' }, percentage: '20.9%' },
                        { product: { ar: 'الإلكترونيات', en: 'Electronics' }, value: { ar: '125 مليار دولار', en: '$125 billion' }, percentage: '16.5%' },
                        { product: { ar: 'الآلات', en: 'Machinery' }, value: { ar: '98 مليار دولار', en: '$98 billion' }, percentage: '13.0%' }
                    ],
                    topImports: [
                        { product: { ar: 'النفط الخام', en: 'Crude Oil' }, value: { ar: '145 مليار دولار', en: '$145 billion' }, percentage: '18.5%' },
                        { product: { ar: 'الغاز الطبيعي', en: 'Natural Gas' }, value: { ar: '78 مليار دولار', en: '$78 billion' }, percentage: '10.0%' },
                        { product: { ar: 'الفحم', en: 'Coal' }, value: { ar: '68 مليار دولار', en: '$68 billion' }, percentage: '8.7%' }
                    ],
                    tradingPartners: [
                        { country: { ar: 'الصين', en: 'China' }, trade: { ar: '305 مليار دولار', en: '$305 billion' }, type: 'import' },
                        { country: { ar: 'الولايات المتحدة', en: 'United States' }, trade: { ar: '218 مليار دولار', en: '$218 billion' }, type: 'export' }
                    ]
                },
                security: {
                    militarySpending: { ar: '54.1 مليار دولار', en: '$54.1 billion' },
                    militarySpendingPercentage: { ar: '1.1% من الناتج المحلي', en: '1.1% of GDP' },
                    activePersonnel: { ar: '247,150', en: '247,150' },
                    reservePersonnel: { ar: '56,000', en: '56,000' },
                    defenseBudget: { ar: '48 مليار دولار', en: '$48 billion' },
                    securityForces: { ar: '303,150', en: '303,150' },
                    terrorismIndex: { ar: '2.8 (منخفض جداً)', en: '2.8 (Very Low)' },
                    peaceIndex: { ar: '1.33', en: '1.33' },
                    cyberSecurity: { ar: 'متقدم جداً', en: 'Very Advanced' },
                    borderSecurity: { ar: 'عالي جداً', en: 'Very High' },
                    internalSecurity: { ar: 'ممتاز', en: 'Excellent' },
                    intelligenceAgencies: [
                        { name: { ar: 'وكالة استخبارات الدفاع', en: 'Defense Intelligence Agency' }, director: { ar: 'هيروكي يامازاكي', en: 'Hiroki Yamazaki' }, role: { ar: 'استخبارات عسكرية', en: 'Military Intelligence' } }
                    ],
                    militaryBranches: [
                        { name: { ar: 'قوات الدفاع الذاتي البرية', en: 'Japan Ground Self-Defense Force' }, commander: { ar: 'غورو يواسا', en: 'Goro Yuasa' }, personnel: { ar: '150,000', en: '150,000' } },
                        { name: { ar: 'قوات الدفاع الذاتي البحرية', en: 'Japan Maritime Self-Defense Force' }, commander: { ar: 'هيرواكي ياماموتو', en: 'Hiroaki Yamamoto' }, personnel: { ar: '45,000', en: '45,000' } }
                    ],
                    strategicPartnerships: [
                        { country: { ar: 'الولايات المتحدة', en: 'United States' }, type: { ar: 'تحالف أمني', en: 'Security Alliance' }, since: { ar: '1951', en: '1951' } },
                        { country: { ar: 'أستراليا', en: 'Australia' }, type: { ar: 'شراكة استراتيجية', en: 'Strategic Partnership' }, since: { ar: '2014', en: '2014' } }
                    ]
                },
                leadership: [
                    {
                        title: { ar: 'رئيس الوزراء', en: 'Prime Minister' },
                        name: { ar: 'فوميو كيشيدا', en: 'Fumio Kishida' },
                        position: { ar: 'رئيس وزراء اليابان', en: 'Prime Minister of Japan' },
                        term: { ar: 'منذ 2021', en: 'Since 2021' },
                        phone: '+81-3-5253-2111',
                        email: 'info@kantei.go.jp',
                        photo: 'https://example.com/kishida.jpg'
                    }
                ],
                ministries: [
                    {
                        name: { ar: 'وزارة الخارجية', en: 'Ministry of Foreign Affairs' },
                        minister: { ar: 'يوكو كاميكاوا', en: 'Yoko Kamikawa' },
                        responsibility: { ar: 'العلاقات الخارجية', en: 'Foreign Relations' },
                        phone: '+81-3-3581-3311',
                        email: 'mof-info@mofa.go.jp',
                        website: 'https://www.mofa.go.jp',
                        address: { ar: 'طوكيو', en: 'Tokyo' }
                    }
                ],
                executiveAgencies: [
                    {
                        name: { ar: 'وكالة التعاون الدولية اليابانية', en: 'Japan International Cooperation Agency' },
                        director: { ar: 'أكيهيكو تاناكا', en: 'Akihiko Tanaka' },
                        responsibility: { ar: 'المساعدات الخارجية', en: 'Foreign Assistance' },
                        phone: '+81-3-5220-9000',
                        email: 'info@jica.go.jp',
                        website: 'https://www.jica.go.jp',
                        established: { ar: '1974', en: '1974' }
                    }
                ],
                embassies: [
                    {
                        name: { ar: 'سفارة اليابان في الرياض', en: 'Embassy of Japan in Riyadh' },
                        ambassador: { ar: 'إيتارو ناكاو', en: 'Iwao Nakai' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-0000',
                        email: 'riyadh@eg.mofa.go.jp',
                        website: 'https://www.eg.mofa.go.jp',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' }
                    }
                ],
                consulates: [
                    {
                        name: { ar: 'القنصلية اليابانية في جدة', en: 'Japanese Consulate General in Jeddah' },
                        consul: { ar: 'ماساهيرو ساساكي', en: 'Masahiro Sasaki' },
                        address: { ar: 'شارع الملك فهد, جدة', en: 'King Fahd Street, Jeddah' },
                        phone: '+966-12-667-0000',
                        email: 'jeddah@eg.mofa.go.jp',
                        website: 'https://www.eg.mofa.go.jp/jeddah',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        city: { ar: 'جدة', en: 'Jeddah' }
                    }
                ],
                commercialOffices: [
                    {
                        name: { ar: 'مؤسسة التجارة الخارجية اليابانية', en: 'Japan External Trade Organization' },
                        director: { ar: 'كازوهيرو ناكامورا', en: 'Kazuhiro Nakamura' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-0000',
                        email: 'riyadh@jetro.go.jp',
                        website: 'https://www.jetro.go.jp',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        services: { ar: 'دعم التجارة اليابانية', en: 'Japanese Trade Support' }
                    }
                ]
            },
            'germany': {
                names: { ar: 'ألمانيا', en: 'Germany' },
                flags: { ar: '🇩🇪', en: '🇩🇪' },
                codes: ['DE', 'DEU', 'ألمانيا', 'Germany'],
                basicInfo: {
                    capital: { ar: 'برلين', en: 'Berlin' },
                    region: { ar: 'أوروبا الوسطى', en: 'Central Europe' },
                    population: { ar: '83.2 مليون نسمة', en: '83.2 million' },
                    currency: { ar: 'اليورو', en: 'Euro' },
                    language: { ar: 'الألمانية', en: 'German' },
                    gdp: { ar: '4.3 تريليون دولار', en: '$4.3 trillion' },
                    gdpPerCapita: { ar: '51,200 دولار', en: '$51,200' }
                },
                economy: {
                    gdp: { ar: '4.3 تريليون دولار', en: '$4.3 trillion' },
                    gdpGrowth: { ar: '2.2%', en: '2.2%' },
                    gdpPerCapita: { ar: '51,200 دولار', en: '$51,200' },
                    inflation: { ar: '6.0%', en: '6.0%' },
                    unemployment: { ar: '3.0%', en: '3.0%' },
                    tradeBalance: { ar: '285 مليار دولار', en: '$285 billion' },
                    exports: { ar: '1.98 تريليون دولار', en: '$1.98 trillion' },
                    imports: { ar: '1.7 تريليون دولار', en: '$1.7 trillion' },
                    foreignReserves: { ar: '278 مليار دولار', en: '$278 billion' },
                    publicDebt: { ar: '69% من الناتج المحلي', en: '69% of GDP' },
                    creditRating: { ar: 'AAA', en: 'AAA' },
                    topExports: [
                        { product: { ar: 'السيارات', en: 'Vehicles' }, value: { ar: '285 مليار دولار', en: '$285 billion' }, percentage: '14.4%' },
                        { product: { ar: 'الآلات', en: 'Machinery' }, value: { ar: '245 مليار دولار', en: '$245 billion' }, percentage: '12.4%' },
                        { product: { ar: 'المواد الكيميائية', en: 'Chemicals' }, value: { ar: '185 مليار دولار', en: '$185 billion' }, percentage: '9.3%' }
                    ],
                    topImports: [
                        { product: { ar: 'الآلات', en: 'Machinery' }, value: { ar: '195 مليار دولار', en: '$195 billion' }, percentage: '11.5%' },
                        { product: { ar: 'الإلكترونيات', en: 'Electronics' }, value: { ar: '165 مليار دولار', en: '$165 billion' }, percentage: '9.7%' },
                        { product: { ar: 'المركبات', en: 'Vehicles' }, value: { ar: '145 مليار دولار', en: '$145 billion' }, percentage: '8.5%' }
                    ],
                    tradingPartners: [
                        { country: { ar: 'الولايات المتحدة', en: 'United States' }, trade: { ar: '195 مليار دولار', en: '$195 billion' }, type: 'export' },
                        { country: { ar: 'الصين', en: 'China' }, trade: { ar: '285 مليار دولار', en: '$285 billion' }, type: 'export' }
                    ]
                },
                security: {
                    militarySpending: { ar: '56.0 مليار دولار', en: '$56.0 billion' },
                    militarySpendingPercentage: { ar: '1.3% من الناتج المحلي', en: '1.3% of GDP' },
                    activePersonnel: { ar: '183,500', en: '183,500' },
                    reservePersonnel: { ar: '30,000', en: '30,000' },
                    defenseBudget: { ar: '50 مليار دولار', en: '$50 billion' },
                    securityForces: { ar: '213,500', en: '213,500' },
                    terrorismIndex: { ar: '3.15 (منخفض)', en: '3.15 (Low)' },
                    peaceIndex: { ar: '1.57', en: '1.57' },
                    cyberSecurity: { ar: 'متقدم جداً', en: 'Very Advanced' },
                    borderSecurity: { ar: 'عالي جداً', en: 'Very High' },
                    internalSecurity: { ar: 'ممتاز', en: 'Excellent' },
                    intelligenceAgencies: [
                        { name: { ar: 'المخابرات الألمانية', en: 'Bundesnachrichtendienst' }, director: { ar: 'برونو كال', en: 'Bruno Kahl' }, role: { ar: 'استخبارات خارجية', en: 'Foreign Intelligence' } }
                    ],
                    militaryBranches: [
                        { name: { ar: 'الجيش الألماني', en: 'German Army' }, commander: { ar: 'ألفونس مايز', en: 'Alfons Mais' }, personnel: { ar: '65,000', en: '65,000' } },
                        { name: { ar: 'البحرية الألمانية', en: 'German Navy' }, commander: { ar: 'يان كريستيان كاك', en: 'Jan Christian Kaack' }, personnel: { ar: '16,000', en: '16,000' } }
                    ],
                    strategicPartnerships: [
                        { country: { ar: 'حلف شمال الأطلسي', en: 'NATO' }, type: { ar: 'تحالف عسكري', en: 'Military Alliance' }, since: { ar: '1955', en: '1955' } },
                        { country: { ar: 'فرنسا', en: 'France' }, type: { ar: 'شراكة دفاعية', en: 'Defense Partnership' }, since: { ar: '1963', en: '1963' } }
                    ]
                },
                leadership: [
                    {
                        title: { ar: 'المستشار', en: 'Chancellor' },
                        name: { ar: 'أولاف شولتس', en: 'Olaf Scholz' },
                        position: { ar: 'مستشار ألمانيا', en: 'Chancellor of Germany' },
                        term: { ar: 'منذ 2021', en: 'Since 2021' },
                        phone: '+49-30-220000',
                        email: 'info@bundeskanzler.de',
                        photo: 'https://example.com/scholz.jpg'
                    }
                ],
                ministries: [
                    {
                        name: { ar: 'وزارة الخارجية', en: 'Federal Foreign Office' },
                        minister: { ar: 'أنالينا بيربوك', en: 'Annalena Baerbock' },
                        responsibility: { ar: 'العلاقات الخارجية', en: 'Foreign Relations' },
                        phone: '+49-30-181700',
                        email: 'info@auswaertiges-amt.de',
                        website: 'https://www.auswaertiges-amt.de',
                        address: { ar: 'برلين', en: 'Berlin' }
                    }
                ],
                executiveAgencies: [
                    {
                        name: { ar: 'وكالة المخابرات الألمانية', en: 'Bundesnachrichtendienst' },
                        director: { ar: 'برونو كال', en: 'Bruno Kahl' },
                        responsibility: { ar: 'جمع المخابرات', en: 'Intelligence Gathering' },
                        phone: '+49-228-9910-0',
                        email: 'info@bnd.de',
                        website: 'https://www.bnd.de',
                        established: { ar: '1956', en: '1956' }
                    }
                ],
                embassies: [
                    {
                        name: { ar: 'سفارة ألمانيا في الرياض', en: 'German Embassy in Riyadh' },
                        ambassador: { ar: 'إرلان أوتو', en: 'Erwin Hofer' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-0000',
                        email: 'info@riad.diplo.de',
                        website: 'https://www.riad.diplo.de',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' }
                    }
                ],
                consulates: [
                    {
                        name: { ar: 'القنصلية الألمانية في جدة', en: 'German Consulate General in Jeddah' },
                        consul: { ar: 'يورغن شتاين', en: 'Jürgen Stöhr' },
                        address: { ar: 'شارع الملك فهد, جدة', en: 'King Fahd Street, Jeddah' },
                        phone: '+966-12-667-0000',
                        email: 'jeddah@riad.diplo.de',
                        website: 'https://www.riad.diplo.de/jeddah',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        city: { ar: 'جدة', en: 'Jeddah' }
                    }
                ],
                commercialOffices: [
                    {
                        name: { ar: 'مكتب التجارة الألماني في الرياض', en: 'German Trade Office in Riyadh' },
                        director: { ar: 'أولريتش كلاين', en: 'Ulrich Klein' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-0000',
                        email: 'riyadh@gtai.de',
                        website: 'https://www.gtai.de',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        services: { ar: 'دعم التجارة الألمانية', en: 'German Trade Support' }
                    }
                ]
            },
            'france': {
                names: { ar: 'فرنسا', en: 'France' },
                flags: { ar: '🇫🇷', en: '🇫🇷' },
                codes: ['FR', 'FRA', 'فرنسا', 'France'],
                basicInfo: {
                    capital: { ar: 'باريس', en: 'Paris' },
                    region: { ar: 'أوروبا الغربية', en: 'Western Europe' },
                    population: { ar: '67.4 مليون نسمة', en: '67.4 million' },
                    currency: { ar: 'اليورو', en: 'Euro' },
                    language: { ar: 'الفرنسية', en: 'French' },
                    gdp: { ar: '2.9 تريليون دولار', en: '$2.9 trillion' },
                    gdpPerCapita: { ar: '43,200 دولار', en: '$43,200' }
                },
                economy: {
                    gdp: { ar: '2.9 تريليون دولار', en: '$2.9 trillion' },
                    gdpGrowth: { ar: '2.5%', en: '2.5%' },
                    gdpPerCapita: { ar: '43,200 دولار', en: '$43,200' },
                    inflation: { ar: '5.2%', en: '5.2%' },
                    unemployment: { ar: '7.3%', en: '7.3%' },
                    tradeBalance: { ar: '-45 مليار دولار', en: '-$45 billion' },
                    exports: { ar: '735 مليار دولار', en: '$735 billion' },
                    imports: { ar: '780 مليار دولار', en: '$780 billion' },
                    foreignReserves: { ar: '245 مليار دولار', en: '$245 billion' },
                    publicDebt: { ar: '112% من الناتج المحلي', en: '112% of GDP' },
                    creditRating: { ar: 'AA', en: 'AA' },
                    topExports: [
                        { product: { ar: 'الطائرات', en: 'Aircraft' }, value: { ar: '125 مليار دولار', en: '$125 billion' }, percentage: '17.0%' },
                        { product: { ar: 'الأدوية', en: 'Pharmaceuticals' }, value: { ar: '85 مليار دولار', en: '$85 billion' }, percentage: '11.6%' },
                        { product: { ar: 'السيارات', en: 'Vehicles' }, value: { ar: '68 مليار دولار', en: '$68 billion' }, percentage: '9.3%' }
                    ],
                    topImports: [
                        { product: { ar: 'السيارات', en: 'Vehicles' }, value: { ar: '75 مليار دولار', en: '$75 billion' }, percentage: '9.6%' },
                        { product: { ar: 'النفط الخام', en: 'Crude Oil' }, value: { ar: '65 مليار دولار', en: '$65 billion' }, percentage: '8.3%' },
                        { product: { ar: 'الإلكترونيات', en: 'Electronics' }, value: { ar: '58 مليار دولار', en: '$58 billion' }, percentage: '7.4%' }
                    ],
                    tradingPartners: [
                        { country: { ar: 'ألمانيا', en: 'Germany' }, trade: { ar: '185 مليار دولار', en: '$185 billion' }, type: 'export' },
                        { country: { ar: 'إيطاليا', en: 'Italy' }, trade: { ar: '95 مليار دولار', en: '$95 billion' }, type: 'export' }
                    ]
                },
                security: {
                    militarySpending: { ar: '56.6 مليار دولار', en: '$56.6 billion' },
                    militarySpendingPercentage: { ar: '2.0% من الناتج المحلي', en: '2.0% of GDP' },
                    activePersonnel: { ar: '203,000', en: '203,000' },
                    reservePersonnel: { ar: '141,000', en: '141,000' },
                    defenseBudget: { ar: '45 مليار دولار', en: '$45 billion' },
                    securityForces: { ar: '344,000', en: '344,000' },
                    terrorismIndex: { ar: '3.85 (منخفض)', en: '3.85 (Low)' },
                    peaceIndex: { ar: '1.68', en: '1.68' },
                    cyberSecurity: { ar: 'متقدم', en: 'Advanced' },
                    borderSecurity: { ar: 'عالي', en: 'High' },
                    internalSecurity: { ar: 'جيد جداً', en: 'Very Good' },
                    intelligenceAgencies: [
                        { name: { ar: 'المديرية العامة للأمن الخارجي', en: 'DGSE' }, director: { ar: 'برنار إيمي', en: 'Bernard Émié' }, role: { ar: 'استخبارات خارجية', en: 'Foreign Intelligence' } }
                    ],
                    militaryBranches: [
                        { name: { ar: 'الجيش الفرنسي', en: 'French Army' }, commander: { ar: 'بيير شيل', en: 'Pierre Schill' }, personnel: { ar: '117,000', en: '117,000' } },
                        { name: { ar: 'البحرية الفرنسية', en: 'French Navy' }, commander: { ar: 'نيكولا بروتو', en: 'Nicolas Prévot' }, personnel: { ar: '44,000', en: '44,000' } }
                    ],
                    strategicPartnerships: [
                        { country: { ar: 'حلف شمال الأطلسي', en: 'NATO' }, type: { ar: 'تحالف عسكري', en: 'Military Alliance' }, since: { ar: '1949', en: '1949' } },
                        { country: { ar: 'ألمانيا', en: 'Germany' }, type: { ar: 'شراكة دفاعية', en: 'Defense Partnership' }, since: { ar: '1963', en: '1963' } }
                    ]
                },
                leadership: [
                    {
                        title: { ar: 'الرئيس', en: 'President' },
                        name: { ar: 'إيمانويل ماكرون', en: 'Emmanuel Macron' },
                        position: { ar: 'رئيس فرنسا', en: 'President of France' },
                        term: { ar: 'منذ 2017', en: 'Since 2017' },
                        phone: '+33-1-42-92-81-00',
                        email: 'info@elysee.fr',
                        photo: 'https://example.com/macron.jpg'
                    }
                ],
                ministries: [
                    {
                        name: { ar: 'وزارة الخارجية', en: 'Ministry of Europe and Foreign Affairs' },
                        minister: { ar: 'ستيفان سجورن', en: 'Stéphane Séjourné' },
                        responsibility: { ar: 'العلاقات الخارجية', en: 'Foreign Relations' },
                        phone: '+33-1-43-17-53-00',
                        email: 'info@diplomatie.gouv.fr',
                        website: 'https://www.diplomatie.gouv.fr',
                        address: { ar: 'باريس', en: 'Paris' }
                    }
                ],
                executiveAgencies: [
                    {
                        name: { ar: 'وكالة المخابرات الخارجية', en: 'DGSE' },
                        director: { ar: 'برنارد إيمي', en: 'Bernard Émié' },
                        responsibility: { ar: 'جمع المخابرات الخارجية', en: 'Foreign Intelligence' },
                        phone: '+33-1-42-92-81-00',
                        email: 'info@dgse.fr',
                        website: 'https://www.dgse.fr',
                        established: { ar: '1982', en: '1982' }
                    }
                ],
                embassies: [
                    {
                        name: { ar: 'سفارة فرنسا في الرياض', en: 'French Embassy in Riyadh' },
                        ambassador: { ar: 'لودريك فال', en: 'Ludovic Pouille' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-0000',
                        email: 'info@riyadh.consulfrance.org',
                        website: 'https://www.riyadh.consulfrance.org',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' }
                    }
                ],
                consulates: [
                    {
                        name: { ar: 'القنصلية الفرنسية في جدة', en: 'French Consulate General in Jeddah' },
                        consul: { ar: 'أوليفييه سانفيل', en: 'Olivier Sanvial' },
                        address: { ar: 'شارع الملك فهد, جدة', en: 'King Fahd Street, Jeddah' },
                        phone: '+966-12-667-0000',
                        email: 'jeddah@consulfrance.org',
                        website: 'https://www.consulfrance.org/jeddah',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        city: { ar: 'جدة', en: 'Jeddah' }
                    }
                ],
                commercialOffices: [
                    {
                        name: { ar: 'مكتب التجارة الفرنسي في الرياض', en: 'French Trade Office in Riyadh' },
                        director: { ar: 'بيير بوشارد', en: 'Pierre Bouchard' },
                        address: { ar: 'حي Diplomatic Quarter, الرياض', en: 'Diplomatic Quarter, Riyadh' },
                        phone: '+966-11-488-0000',
                        email: 'riyadh@businessfrance.fr',
                        website: 'https://www.businessfrance.fr',
                        country: { ar: 'المملكة العربية السعودية', en: 'Saudi Arabia' },
                        services: { ar: 'دعم التجارة الفرنسية', en: 'French Trade Support' }
                    }
                ]
            }
        };

        // Initialize countries
        for (const [key, data] of Object.entries(countriesData)) {
            this.countries.set(key, data);
        }
    }

    searchCountry(query, language = 'ar') {
        const queryLower = query.toLowerCase();

        // Search by codes and names
        for (const [key, country] of this.countries) {
            if (country.codes.some(code => code.toLowerCase() === queryLower)) {
                return this.formatCountryData(country, language);
            }

            if (country.names[language].toLowerCase().includes(queryLower) ||
                country.names.en.toLowerCase().includes(queryLower)) {
                return this.formatCountryData(country, language);
            }
        }

        return null;
    }

    formatCountryData(country, lang = 'ar') {
        return {
            names: country.names,
            flags: country.flags,
            codes: country.codes,
            basicInfo: {
                name: country.names[lang],
                capital: country.basicInfo.capital[lang],
                region: country.basicInfo.region[lang],
                population: country.basicInfo.population[lang],
                currency: country.basicInfo.currency[lang],
                language: country.basicInfo.language[lang],
                gdp: country.basicInfo.gdp[lang],
                gdpPerCapita: country.basicInfo.gdpPerCapita[lang]
            },
            leadership: country.leadership,
            ministries: country.ministries,
            executiveAgencies: country.executiveAgencies,
            embassies: country.embassies,
            consulates: country.consulates,
            commercialOffices: country.commercialOffices,
            economy: country.economy || {},
            security: country.security || {},
            statistics: country.statistics || {},
            flag: country.flags[lang]
        };
    }

    getAllCountries(language = 'ar') {
        const countries = [];
        for (const [key, country] of this.countries) {
            countries.push({
                key: key,
                name: country.names[language],
                flag: country.flags[language],
                codes: country.codes
            });
        }
        return countries.sort((a, b) => a.name.localeCompare(b.name, language === 'ar' ? 'ar' : 'en'));
    }

    getCountryCount() {
        return this.countries.size;
    }

    getAvailableCountries() {
        return Array.from(this.countries.keys());
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CleanGovernmentDataManager;
} else {
    window.CleanGovernmentDataManager = CleanGovernmentDataManager;
}

// Debug: Make sure it's available
console.log('🧪 Clean GovernmentDataManager exported:', typeof window.CleanGovernmentDataManager);

// Debug: Make sure it's available
console.log('🧪 Clean GovernmentDataManager exported:', typeof window.CleanGovernmentDataManager);
