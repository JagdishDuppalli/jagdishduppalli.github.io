interface Scripts {
    name: string;
    src: string;
}

export const ScriptStore: Scripts[] = [
    {name: 'jquery1', src: '../assets/lib/jquery/jquery.min.js'},
    {name: 'jquery2', src: '../assets/lib/jquery/jquery-migrate.min.js'},
    {name: 'bootstrap', src: '../assets/lib/bootstrap/js/bootstrap.bundle.min.js' },
    {name: 'easing', src: '../assets/lib/easing/easing.min.js' },
    {name: 'hoverIntent', src: '../assets/lib/superfish/hoverIntent.js' },
    {name: 'superfish', src: '../assets/lib/superfish/superfish.min.js' },
    {name: 'wow', src: '../assets/lib/wow/wow.min.js' },
    {name: 'owl', src: '../assets/lib/owlcarousel/owl.carousel.min.js' },
    {name: 'magnific', src: '../assets/lib/magnific-popup/magnific-popup.min.js' },
    {name: 'sticky', src: '../assets/lib/sticky/sticky.js' },
    {name: 'main', src: '../assets/js/main.js' }
];