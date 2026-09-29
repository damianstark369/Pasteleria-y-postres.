// Inicializar los iconos
lucide.createIcons();

// Catálogo de Productos
const productos = [
    {
        id: 1,
        nombre: 'Pastel de Chocolate Velvet',
        categoria: 'pasteles',
        precio: 28.00,
        imagen: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
        descripcion: 'Delicioso bizcocho de chocolate intenso con cobertura de trufa.'
    },
    {
        id: 2,
        nombre: 'Cheesecake de Frutos Rojos',
        categoria: 'postres',
        precio: 18.50,
        imagen: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
        descripcion: 'Suave crema de queso horneada sobre galleta con mermelada de frutos del bosque.'
    },
    {
        id: 3,
        nombre: 'Galletas de Chocochips',
        categoria: 'galletas',
        precio: 12.00,
        imagen: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
        descripcion: 'Paquete x6 galletas crujientes por fuera y suaves por dentro con chispas de chocolate.'
    },
    {
        id: 4,
        nombre: 'Pastel Red Velvet',
        categoria: 'pasteles',
        precio: 26.00,
        imagen: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80&w=600',
        descripcion: 'Esponjoso pastel rojo con capas de crema suave de queso cream cheese.'
    },
    {
        id: 5,
        nombre: 'Tiramisú Tradicional',
        categoria: 'postres',
        precio: 15.00,
        imagen: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
        descripcion: 'Postre italiano con capas de bizcocho de café, mascarpone y cacao en polvo.'
    },
    {
        id: 6,
        nombre: 'Galletas Red Velvet & White Choco',
        categoria: 'galletas',
        precio: 14.00,
        imagen: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
        descripcion: 'Galletas artesanales de aterciopelado rojo con chispas de chocolate blanco.'
    }
];

let carrito = [];

// Función para renderizar los productos en la interfaz
function cargarProductos(lista) {
    const grid = document.getElementById('grid-productos');
    grid.innerHTML = lista.map(p => `
        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
                <div class="h-56 overflow-hidden relative">
                    <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
                    <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                        ${p.categoria}
                    </span>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-slate-800 mb-2">${p.nombre}</h3>
                    <p class="text-slate-500 text-sm leading-relaxed mb-4">${p.descripcion}</p>
                </div>
            </div>
            <div class="px-6 pb-6 pt-0 flex items-center justify-between">
                <span class="text-2xl font-bold text-slate-900">$${p.precio.toFixed(2)}</span>
                <button onclick="agregarAlCarrito(${p.id})" class="bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-colors flex items-center gap-2 font-medium">
                    <i data-lucide="plus" class="w-5 h-5"></i> Agregar
                </button>
            </div>
        </div>
    `).join('');
    
    // Volver a renderizar iconos dinamicos
    lucide.createIcons();
}

// Filtrar Categorías
function filtrarCategoria(cat) {
    const filtrados = cat === 'todas' ? productos : productos.filter(p => p.categoria === cat);
    cargarProductos(filtrados);
}

// Agregar al Carrito
function agregarAlCarrito(id) {
    const prod = productos.find(p => p.id === id);
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad++;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }
    actualizarCarrito();
}

// Actualizar Vista del Carrito
function actualizarCarrito() {
    const cont = document.getElementById('carrito-items');
    const totalElem = document.getElementById('carrito-total');
    const countElem = document.getElementById('cart-count');

    countElem.innerText = carrito.reduce((acc, i) => acc + i.cantidad, 0);

    if (carrito.length === 0) {
        cont.innerHTML = `<p class="text-slate-400 text-center py-8">Tu carrito está vacío.</p>`;
        totalElem.innerText = '$0.00';
        return;
    }

    cont.innerHTML = carrito.map(item => `
        <div class="flex items-center justify-between gap-4 bg-slate-50 p-3 rounded-xl">
            <div>
                <h4 class="font-bold text-slate-800 text-sm">${item.nombre}</h4>
                <span class="text-xs text-slate-500">$${item.precio.toFixed(2)} x ${item.cantidad}</span>
            </div>
            <div class="flex items-center gap-2">
                <span class="font-bold text-slate-800">$${(item.precio * item.cantidad).toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${item.id})" class="text-rose-500 p-1 hover:bg-rose-50 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `).join('');

    const total = carrito.reduce((acc, i) => acc + (i.precio * i.cantidad), 0);
    totalElem.innerText = `$${total.toFixed(2)}`;
    lucide.createIcons();
}

// Eliminar elemento individual
function eliminarDelCarrito(id) {
    carrito = carrito.filter(i => i.id !== id);
    actualizarCarrito();
}

// Abrir / Cerrar Carrito
function toggleCarrito() {
    const modal = document.getElementById('carrito-modal');
    const panel = document.getElementById('carrito-panel');
    modal.classList.toggle('opacity-0');
    modal.classList.toggle('pointer-events-none');
    panel.classList.toggle('translate-x-full');
}

// Finalizar pedido
function realizarPedido() {
    if (carrito.length === 0) return alert('Agrega productos al carrito primero.');
    alert('¡Gracias por tu compra! Tu pedido de postres ha sido procesado.');
    carrito = [];
    actualizarCarrito();
    toggleCarrito();
}

// Cargar catálogo inicial al entrar
cargarProductos(productos);