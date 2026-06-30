import prisma from "../../prismaClient.js";

export async function seedProducts() {
  // ─── Tiendas ──────────────────────────────────────────────────────────────
  const store1 = await prisma.store.findFirstOrThrow({
    where: { name: "Tienda Don Carlos" },
  });
  const store2 = await prisma.store.findFirstOrThrow({
    where: { name: "Minimercado La Esquina" },
  });
  const store3 = await prisma.store.findFirstOrThrow({
    where: { name: "Tienda Doña Rosa" },
  });
  const store4 = await prisma.store.findFirstOrThrow({
    where: { name: "Fruver El Palmar" },
  });
  const store5 = await prisma.store.findFirstOrThrow({
    where: { name: "Fruver El Roble" },
  });
  const store6 = await prisma.store.findFirstOrThrow({
    where: { name: "Autoservicio San José" },
  });
  const store7 = await prisma.store.findFirstOrThrow({
    where: { name: "Tienda La Economía" },
  });
  const store8 = await prisma.store.findFirstOrThrow({
    where: { name: "Licorera Los Pinos" },
  });
  const store9 = await prisma.store.findFirstOrThrow({
    where: { name: "Licorera Don Pedro" },
  });
  const store10 = await prisma.store.findFirstOrThrow({
    where: { name: "Ferretería La Fortuna" },
  });
  const store11 = await prisma.store.findFirstOrThrow({
    where: { name: "Ferretería La Bendición" },
  });
  const store12 = await prisma.store.findFirstOrThrow({
    where: { name: "Papelería El Carmelo" },
  });
  const store13 = await prisma.store.findFirstOrThrow({
    where: { name: "Papelería El Buen Precio" },
  });
  const store14 = await prisma.store.findFirstOrThrow({
    where: { name: "Cafetería La Quinta" },
  });
  const store15 = await prisma.store.findFirstOrThrow({
    where: { name: "Cafetería Doña Inés" },
  });

  // ─── Categorías de producto ──────────────────────────────────────────────
  const catBebidas = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Bebidas" },
  });
  const catLacteos = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Lácteos" },
  });
  const catSnacks = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Snacks" },
  });
  const catAseo = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Aseo" },
  });
  const catGranos = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Granos" },
  });
  const catFrutasVerduras = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Frutas y Verduras" },
  });
  const catLicores = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Licores" },
  });
  const catFerreteria = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Ferretería" },
  });
  const catPapeleria = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Papelería" },
  });
  const catCafeteria = await prisma.productCategory.findFirstOrThrow({
    where: { name: "Cafetería" },
  });

  // ─── Unidades de medida ──────────────────────────────────────────────────
  const uomUnidad = await prisma.unitOfMeasure.findFirstOrThrow({
    where: { name: "Unidad" },
  });
  const uomLitro = await prisma.unitOfMeasure.findFirstOrThrow({
    where: { name: "Litro" },
  });
  const uomKg = await prisma.unitOfMeasure.findFirstOrThrow({
    where: { name: "Kilogramo" },
  });
  const uomPaquete = await prisma.unitOfMeasure.findFirstOrThrow({
    where: { name: "Paquete" },
  });

  const products = [
    // ─── Tienda Don Carlos ───────────────────────────────────────────────────

    // Bebidas
    {
      name: "Agua Cristal 600ml",
      price: 1800,
      referenceCode: "BEB-001",
      lowStockThreshold: 24,
      currentStock: 96,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Agua Cristal 1.5L",
      price: 3200,
      referenceCode: "BEB-002",
      lowStockThreshold: 12,
      currentStock: 48,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Gaseosa Postobón Manzana 400ml",
      price: 2500,
      referenceCode: "BEB-003",
      lowStockThreshold: 12,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1625772452859-1c03d884dcd7?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Gaseosa Postobón Uva 2L",
      price: 6500,
      referenceCode: "BEB-004",
      lowStockThreshold: 6,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomLitro.id,
      storeId: store1.id,
    },
    {
      name: "Gaseosa Coca-Cola 400ml",
      price: 2800,
      referenceCode: "BEB-005",
      lowStockThreshold: 12,
      currentStock: 72,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Jugo Hit Naranja 300ml",
      price: 2200,
      referenceCode: "BEB-006",
      lowStockThreshold: 12,
      currentStock: 36,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Avena Quaker Líquida 250ml",
      price: 2500,
      referenceCode: "BEB-007",
      lowStockThreshold: 12,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Cerveza Águila 330ml",
      price: 3200,
      referenceCode: "BEB-008",
      lowStockThreshold: 24,
      currentStock: 48,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },

    // Lácteos
    {
      name: "Leche Alquería Entera 1L",
      price: 4200,
      referenceCode: "LAC-001",
      lowStockThreshold: 12,
      currentStock: 36,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomLitro.id,
      storeId: store1.id,
    },
    {
      name: "Leche Alquería Deslactosada 1L",
      price: 4800,
      referenceCode: "LAC-002",
      lowStockThreshold: 6,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomLitro.id,
      storeId: store1.id,
    },
    {
      name: "Queso Campesino 250g",
      price: 5500,
      referenceCode: "LAC-003",
      lowStockThreshold: 5,
      currentStock: 12,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Queso Campesino 500g",
      price: 9800,
      referenceCode: "LAC-004",
      lowStockThreshold: 5,
      currentStock: 10,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Yogur Alpina Fresa 150g",
      price: 2200,
      referenceCode: "LAC-005",
      lowStockThreshold: 12,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Kumis Alquería 200ml",
      price: 2800,
      referenceCode: "LAC-006",
      lowStockThreshold: 6,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Mantequilla Colanta 100g",
      price: 3500,
      referenceCode: "LAC-007",
      lowStockThreshold: 5,
      currentStock: 15,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },

    // Snacks
    {
      name: "Papas Margarita Sal 105g",
      price: 2800,
      referenceCode: "SNK-001",
      lowStockThreshold: 12,
      currentStock: 48,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Papas Margarita Limón 105g",
      price: 2800,
      referenceCode: "SNK-002",
      lowStockThreshold: 12,
      currentStock: 36,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Chitos Flaming 55g",
      price: 1800,
      referenceCode: "SNK-003",
      lowStockThreshold: 12,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Galletas Oreo 36g",
      price: 1500,
      referenceCode: "SNK-004",
      lowStockThreshold: 12,
      currentStock: 72,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Galletas Festival Vainilla 6u",
      price: 1200,
      referenceCode: "SNK-005",
      lowStockThreshold: 12,
      currentStock: 48,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1594985451284-2d3aae9a22d8?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store1.id,
    },
    {
      name: "Chocolatina Jet 16g",
      price: 900,
      referenceCode: "SNK-006",
      lowStockThreshold: 24,
      currentStock: 120,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },

    // Granos
    {
      name: "Arroz Diana 500g",
      price: 2800,
      referenceCode: "GRA-001",
      lowStockThreshold: 12,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1536304993881-ff86e0c4c574?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store1.id,
    },
    {
      name: "Arroz Diana 1kg",
      price: 5200,
      referenceCode: "GRA-002",
      lowStockThreshold: 10,
      currentStock: 80,
      status: "Active",
      photo:
        "https://plus.unsplash.com/premium_photo-1705338026411-00639520a438?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store1.id,
    },
    {
      name: "Frijol Cargamanto 500g",
      price: 4500,
      referenceCode: "GRA-003",
      lowStockThreshold: 8,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store1.id,
    },
    {
      name: "Lenteja 500g",
      price: 3800,
      referenceCode: "GRA-004",
      lowStockThreshold: 8,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store1.id,
    },
    {
      name: "Garbanzo 500g",
      price: 4200,
      referenceCode: "GRA-005",
      lowStockThreshold: 6,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store1.id,
    },
    {
      name: "Azúcar Manuelita 1kg",
      price: 4800,
      referenceCode: "GRA-006",
      lowStockThreshold: 10,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1579761626000-8e7f0d3d3e23?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store1.id,
    },
    {
      name: "Sal Refisal 500g",
      price: 1500,
      referenceCode: "GRA-007",
      lowStockThreshold: 8,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1628428738249-31dcb4a36284?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store1.id,
    },
    {
      name: "Harina de Trigo 1kg",
      price: 4200,
      referenceCode: "GRA-008",
      lowStockThreshold: 6,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store1.id,
    },

    // ─── Minimercado La Esquina ──────────────────────────────────────────────

    // Bebidas
    {
      name: "Gaseosa Sprite 400ml",
      price: 2800,
      referenceCode: "E-BEB-001",
      lowStockThreshold: 12,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Agua Brisa 600ml",
      price: 1800,
      referenceCode: "E-BEB-002",
      lowStockThreshold: 24,
      currentStock: 72,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Jugo Frutiño Uva 240ml",
      price: 1200,
      referenceCode: "E-BEB-003",
      lowStockThreshold: 12,
      currentStock: 48,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Pony Malta 330ml",
      price: 2500,
      referenceCode: "E-BEB-004",
      lowStockThreshold: 12,
      currentStock: 36,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1570598912132-0ba1dc952b7d?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Avena Quaker en Polvo 180g",
      price: 4500,
      referenceCode: "E-BEB-005",
      lowStockThreshold: 8,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },

    // Lácteos
    {
      name: "Leche Colanta Entera 1L",
      price: 4000,
      referenceCode: "E-LAC-001",
      lowStockThreshold: 12,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomLitro.id,
      storeId: store2.id,
    },
    {
      name: "Queso Doblecrema 250g",
      price: 6200,
      referenceCode: "E-LAC-002",
      lowStockThreshold: 5,
      currentStock: 12,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1634487359989-3e90c9432133?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Crema de Leche Alpina 200ml",
      price: 3800,
      referenceCode: "E-LAC-003",
      lowStockThreshold: 6,
      currentStock: 15,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Arequipe Alpina 200g",
      price: 4200,
      referenceCode: "E-LAC-004",
      lowStockThreshold: 5,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },

    // Snacks
    {
      name: "Cheetos Queso 65g",
      price: 2200,
      referenceCode: "E-SNK-001",
      lowStockThreshold: 12,
      currentStock: 50,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1626082929543-1c2f4b1a8a1a?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Papas Natuchips Natural 85g",
      price: 2500,
      referenceCode: "E-SNK-002",
      lowStockThreshold: 12,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1576642589592-7d9d2a4f8e60?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Galletas Saltín Noel 134g",
      price: 3200,
      referenceCode: "E-SNK-003",
      lowStockThreshold: 8,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Maní con Pasas 100g",
      price: 2800,
      referenceCode: "E-SNK-004",
      lowStockThreshold: 10,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1567217729596-96c58f3c8b47?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Bom Bom Bum Fresa",
      price: 500,
      referenceCode: "E-SNK-005",
      lowStockThreshold: 30,
      currentStock: 150,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },

    // Aseo
    {
      name: "Jabón Rey Limón 300g",
      price: 3200,
      referenceCode: "E-ASE-001",
      lowStockThreshold: 6,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1600857544200-b2f468e15d0b?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Detergente Ariel 500g",
      price: 8200,
      referenceCode: "E-ASE-002",
      lowStockThreshold: 5,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store2.id,
    },
    {
      name: "Detergente Fab Floral 1kg",
      price: 12500,
      referenceCode: "E-ASE-003",
      lowStockThreshold: 5,
      currentStock: 15,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1585232350693-48c75b4e8c44?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomKg.id,
      storeId: store2.id,
    },
    {
      name: "Limpiapisos Fabuloso Lavanda 900ml",
      price: 7500,
      referenceCode: "E-ASE-004",
      lowStockThreshold: 4,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Papel Higiénico Scott 4 rollos",
      price: 6800,
      referenceCode: "E-ASE-005",
      lowStockThreshold: 6,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store2.id,
    },
    {
      name: "Shampoo Head & Shoulders 200ml",
      price: 18500,
      referenceCode: "E-ASE-006",
      lowStockThreshold: 4,
      currentStock: 12,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Pasta Dental Colgate Triple 75ml",
      price: 5500,
      referenceCode: "E-ASE-007",
      lowStockThreshold: 6,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Desodorante Axe 97g",
      price: 14900,
      referenceCode: "E-ASE-008",
      lowStockThreshold: 4,
      currentStock: 10,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },

    // Granos
    {
      name: "Arroz Roa 1kg",
      price: 5000,
      referenceCode: "E-GRA-001",
      lowStockThreshold: 10,
      currentStock: 55,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store2.id,
    },
    {
      name: "Frijol Bolo Rojo 500g",
      price: 4200,
      referenceCode: "E-GRA-002",
      lowStockThreshold: 8,
      currentStock: 28,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1623428187425-b3e4ea3e9754?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store2.id,
    },
    {
      name: "Azúcar Riopaila 2kg",
      price: 9200,
      referenceCode: "E-GRA-003",
      lowStockThreshold: 6,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1598449356475-b9f71db7d847?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store2.id,
    },
    {
      name: "Panela Redonda 500g",
      price: 3800,
      referenceCode: "E-GRA-004",
      lowStockThreshold: 8,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1558642891-54be180ea339?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },
    {
      name: "Aceite Girasol Premier 900ml",
      price: 16500,
      referenceCode: "E-GRA-005",
      lowStockThreshold: 4,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store2.id,
    },

    // ─── Tienda Doña Rosa (abarrotes) ───────────────────────────────────────
    {
      name: "Gaseosa Postobón Manzana 1.5L",
      price: 4800,
      referenceCode: "R-BEB-001",
      lowStockThreshold: 10,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1625772452859-1c03d884dcd7?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store3.id,
    },
    {
      name: "Agua Manantial 600ml",
      price: 1700,
      referenceCode: "R-BEB-002",
      lowStockThreshold: 24,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store3.id,
    },
    {
      name: "Leche Algarra Entera 1L",
      price: 4100,
      referenceCode: "R-LAC-001",
      lowStockThreshold: 10,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomLitro.id,
      storeId: store3.id,
    },
    {
      name: "Papas Margarita Sal 45g",
      price: 1500,
      referenceCode: "R-SNK-001",
      lowStockThreshold: 12,
      currentStock: 50,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store3.id,
    },
    {
      name: "Galletas Festival Chocolate 6u",
      price: 1200,
      referenceCode: "R-SNK-002",
      lowStockThreshold: 12,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1594985451284-2d3aae9a22d8?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store3.id,
    },
    {
      name: "Arroz Diana 500g",
      price: 2900,
      referenceCode: "R-GRA-001",
      lowStockThreshold: 10,
      currentStock: 45,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1536304993881-ff86e0c4c574?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store3.id,
    },
    {
      name: "Jabón Rey Limón 300g",
      price: 3300,
      referenceCode: "R-ASE-001",
      lowStockThreshold: 6,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1600857544200-b2f468e15d0b?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store3.id,
    },

    // ─── Fruver El Palmar ────────────────────────────────────────────────────
    {
      name: "Banano x kg",
      price: 2500,
      referenceCode: "FRV1-001",
      lowStockThreshold: 5,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store4.id,
    },
    {
      name: "Tomate Chonto x kg",
      price: 3200,
      referenceCode: "FRV1-002",
      lowStockThreshold: 5,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store4.id,
    },
    {
      name: "Papa Pastusa x kg",
      price: 2200,
      referenceCode: "FRV1-003",
      lowStockThreshold: 8,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store4.id,
    },
    {
      name: "Cebolla Cabezona x kg",
      price: 3500,
      referenceCode: "FRV1-004",
      lowStockThreshold: 5,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store4.id,
    },
    {
      name: "Naranja Valencia x kg",
      price: 2800,
      referenceCode: "FRV1-005",
      lowStockThreshold: 5,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store4.id,
    },
    {
      name: "Aguacate Hass",
      price: 2500,
      referenceCode: "FRV1-006",
      lowStockThreshold: 10,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store4.id,
    },

    // ─── Fruver El Roble ─────────────────────────────────────────────────────
    {
      name: "Limón Tahití x kg",
      price: 2800,
      referenceCode: "FRV2-001",
      lowStockThreshold: 5,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store5.id,
    },
    {
      name: "Zanahoria x kg",
      price: 2200,
      referenceCode: "FRV2-002",
      lowStockThreshold: 5,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store5.id,
    },
    {
      name: "Plátano Verde x kg",
      price: 2000,
      referenceCode: "FRV2-003",
      lowStockThreshold: 8,
      currentStock: 45,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1543218024-57a70143c369?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store5.id,
    },
    {
      name: "Mango Tommy x kg",
      price: 3000,
      referenceCode: "FRV2-004",
      lowStockThreshold: 5,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store5.id,
    },
    {
      name: "Cilantro Atado",
      price: 1000,
      referenceCode: "FRV2-005",
      lowStockThreshold: 10,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1622206151226-18ca2c9d680f?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store5.id,
    },
    {
      name: "Mora x kg",
      price: 4500,
      referenceCode: "FRV2-006",
      lowStockThreshold: 5,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1577003833619-76bbd7f82948?w=400&q=80",
      productCategoryId: catFrutasVerduras.id,
      unitOfMeasureId: uomKg.id,
      storeId: store5.id,
    },

    // ─── Autoservicio San José (abarrotes) ──────────────────────────────────
    {
      name: "Gaseosa Coca-Cola 1.5L",
      price: 5200,
      referenceCode: "SJ-BEB-001",
      lowStockThreshold: 10,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store6.id,
    },
    {
      name: "Cerveza Poker 330ml",
      price: 3000,
      referenceCode: "SJ-BEB-002",
      lowStockThreshold: 24,
      currentStock: 48,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store6.id,
    },
    {
      name: "Yogur Alpina Mora 200g",
      price: 2400,
      referenceCode: "SJ-LAC-001",
      lowStockThreshold: 12,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store6.id,
    },
    {
      name: "Chocorramo",
      price: 2200,
      referenceCode: "SJ-SNK-001",
      lowStockThreshold: 12,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store6.id,
    },
    {
      name: "Lenteja 500g",
      price: 3900,
      referenceCode: "SJ-GRA-001",
      lowStockThreshold: 8,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store6.id,
    },
    {
      name: "Detergente Ariel 500g",
      price: 8300,
      referenceCode: "SJ-ASE-001",
      lowStockThreshold: 5,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store6.id,
    },

    // ─── Tienda La Economía (abarrotes) ─────────────────────────────────────
    {
      name: "Agua Cristal 600ml",
      price: 1750,
      referenceCode: "ECO-BEB-001",
      lowStockThreshold: 24,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1616118132534-381148898bb4?w=400&q=80",
      productCategoryId: catBebidas.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store7.id,
    },
    {
      name: "Leche Colanta Entera 1L",
      price: 3950,
      referenceCode: "ECO-LAC-001",
      lowStockThreshold: 10,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=400&q=80",
      productCategoryId: catLacteos.id,
      unitOfMeasureId: uomLitro.id,
      storeId: store7.id,
    },
    {
      name: "Galletas Saltín Noel 134g",
      price: 3100,
      referenceCode: "ECO-SNK-001",
      lowStockThreshold: 8,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&q=80",
      productCategoryId: catSnacks.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store7.id,
    },
    {
      name: "Azúcar Manuelita 1kg",
      price: 4700,
      referenceCode: "ECO-GRA-001",
      lowStockThreshold: 10,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1579761626000-8e7f0d3d3e23?w=400&q=80",
      productCategoryId: catGranos.id,
      unitOfMeasureId: uomKg.id,
      storeId: store7.id,
    },
    {
      name: "Papel Higiénico Familia 4 rollos",
      price: 6500,
      referenceCode: "ECO-ASE-001",
      lowStockThreshold: 6,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80",
      productCategoryId: catAseo.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store7.id,
    },

    // ─── Licorera Los Pinos ──────────────────────────────────────────────────
    {
      name: "Cerveza Águila Light 330ml",
      price: 3200,
      referenceCode: "LIC1-001",
      lowStockThreshold: 24,
      currentStock: 60,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store8.id,
    },
    {
      name: "Ron Viejo de Caldas 375ml",
      price: 32000,
      referenceCode: "LIC1-002",
      lowStockThreshold: 5,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store8.id,
    },
    {
      name: "Aguardiente Antioqueño 375ml",
      price: 28000,
      referenceCode: "LIC1-003",
      lowStockThreshold: 5,
      currentStock: 24,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1582819509237-d5b4cda99e69?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store8.id,
    },
    {
      name: "Whisky Old Parr 750ml",
      price: 98000,
      referenceCode: "LIC1-004",
      lowStockThreshold: 3,
      currentStock: 8,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store8.id,
    },
    {
      name: "Cerveza Club Colombia 330ml",
      price: 3800,
      referenceCode: "LIC1-005",
      lowStockThreshold: 24,
      currentStock: 48,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store8.id,
    },
    {
      name: "Vino Santo Tomás 750ml",
      price: 35000,
      referenceCode: "LIC1-006",
      lowStockThreshold: 4,
      currentStock: 12,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store8.id,
    },

    // ─── Licorera Don Pedro ──────────────────────────────────────────────────
    {
      name: "Ron Medellín Añejo 750ml",
      price: 45000,
      referenceCode: "LIC2-001",
      lowStockThreshold: 4,
      currentStock: 15,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store9.id,
    },
    {
      name: "Aguardiente Néctar 375ml",
      price: 27000,
      referenceCode: "LIC2-002",
      lowStockThreshold: 5,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1582819509237-d5b4cda99e69?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store9.id,
    },
    {
      name: "Cerveza Corona 355ml",
      price: 4500,
      referenceCode: "LIC2-003",
      lowStockThreshold: 24,
      currentStock: 36,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1613219629702-9c4e1d2bba0a?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store9.id,
    },
    {
      name: "Vino Marqués de Cáceres 750ml",
      price: 52000,
      referenceCode: "LIC2-004",
      lowStockThreshold: 3,
      currentStock: 10,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store9.id,
    },
    {
      name: "Whisky Buchanan's 750ml",
      price: 110000,
      referenceCode: "LIC2-005",
      lowStockThreshold: 3,
      currentStock: 6,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&q=80",
      productCategoryId: catLicores.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store9.id,
    },

    // ─── Ferretería La Fortuna ───────────────────────────────────────────────
    {
      name: "Martillo de Uña",
      price: 22000,
      referenceCode: "FER1-001",
      lowStockThreshold: 5,
      currentStock: 15,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1581147036324-c1c5b2c0c0f1?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store10.id,
    },
    {
      name: "Cinta Métrica 5m",
      price: 12000,
      referenceCode: "FER1-002",
      lowStockThreshold: 6,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1581092160607-ee22731c9c75?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store10.id,
    },
    {
      name: "Tornillos Autoperforantes x100",
      price: 9500,
      referenceCode: "FER1-003",
      lowStockThreshold: 8,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1591588582259-37e8ab02bb87?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store10.id,
    },
    {
      name: "Pintura Blanca 1 Galón",
      price: 48000,
      referenceCode: "FER1-004",
      lowStockThreshold: 4,
      currentStock: 12,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store10.id,
    },
    {
      name: "Cable Eléctrico Calibre 12 Rollo",
      price: 65000,
      referenceCode: "FER1-005",
      lowStockThreshold: 3,
      currentStock: 8,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store10.id,
    },
    {
      name: "Candado 40mm",
      price: 15000,
      referenceCode: "FER1-006",
      lowStockThreshold: 6,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1620912189865-1e2f12ce9c41?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store10.id,
    },

    // ─── Ferretería La Bendición ─────────────────────────────────────────────
    {
      name: "Set de Destornilladores 6 Piezas",
      price: 28000,
      referenceCode: "FER2-001",
      lowStockThreshold: 5,
      currentStock: 14,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store11.id,
    },
    {
      name: "Brocha 3 Pulgadas",
      price: 8500,
      referenceCode: "FER2-002",
      lowStockThreshold: 8,
      currentStock: 22,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store11.id,
    },
    {
      name: "Silicona Líquida 280ml",
      price: 11000,
      referenceCode: "FER2-003",
      lowStockThreshold: 6,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store11.id,
    },
    {
      name: "Guantes de Carnaza Par",
      price: 9500,
      referenceCode: "FER2-004",
      lowStockThreshold: 8,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1605664041952-4a6f2bc3a4c5?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store11.id,
    },
    {
      name: "Manguera de Jardín 10m",
      price: 38000,
      referenceCode: "FER2-005",
      lowStockThreshold: 3,
      currentStock: 10,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1591104619829-8b25c785a3b2?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store11.id,
    },
    {
      name: "Bombillo LED 9W",
      price: 7500,
      referenceCode: "FER2-006",
      lowStockThreshold: 10,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1565374792971-0c5a8c1b1f6a?w=400&q=80",
      productCategoryId: catFerreteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store11.id,
    },

    // ─── Papelería El Carmelo ────────────────────────────────────────────────
    {
      name: "Cuaderno Norma 100 Hojas",
      price: 5500,
      referenceCode: "PAP1-001",
      lowStockThreshold: 10,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store12.id,
    },
    {
      name: "Resma Papel Carta 500 Hojas",
      price: 16000,
      referenceCode: "PAP1-002",
      lowStockThreshold: 6,
      currentStock: 18,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store12.id,
    },
    {
      name: "Lapicero Bic Punta Media",
      price: 1200,
      referenceCode: "PAP1-003",
      lowStockThreshold: 24,
      currentStock: 80,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store12.id,
    },
    {
      name: "Colores Prismacolor x12",
      price: 18500,
      referenceCode: "PAP1-004",
      lowStockThreshold: 8,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomPaquete.id,
      storeId: store12.id,
    },
    {
      name: "Carpeta Plástica Tamaño Oficio",
      price: 2800,
      referenceCode: "PAP1-005",
      lowStockThreshold: 12,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store12.id,
    },
    {
      name: "Tijeras Escolares",
      price: 3200,
      referenceCode: "PAP1-006",
      lowStockThreshold: 10,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store12.id,
    },

    // ─── Papelería El Buen Precio ────────────────────────────────────────────
    {
      name: "Marcador Sharpie Negro",
      price: 4500,
      referenceCode: "PAP2-001",
      lowStockThreshold: 12,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store13.id,
    },
    {
      name: "Cinta Adhesiva Transparente",
      price: 1800,
      referenceCode: "PAP2-002",
      lowStockThreshold: 20,
      currentStock: 50,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1587583021674-29d569d31a3d?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store13.id,
    },
    {
      name: "Cosedora Industrial",
      price: 22000,
      referenceCode: "PAP2-003",
      lowStockThreshold: 4,
      currentStock: 10,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store13.id,
    },
    {
      name: "Block Cuadriculado",
      price: 3800,
      referenceCode: "PAP2-004",
      lowStockThreshold: 10,
      currentStock: 28,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store13.id,
    },
    {
      name: "Lápiz Mirado #2",
      price: 800,
      referenceCode: "PAP2-005",
      lowStockThreshold: 30,
      currentStock: 100,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store13.id,
    },
    {
      name: "Borrador Nata",
      price: 700,
      referenceCode: "PAP2-006",
      lowStockThreshold: 30,
      currentStock: 90,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&q=80",
      productCategoryId: catPapeleria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store13.id,
    },

    // ─── Cafetería La Quinta ─────────────────────────────────────────────────
    {
      name: "Café Tinto Colado",
      price: 1500,
      referenceCode: "CAF1-001",
      lowStockThreshold: 20,
      currentStock: 100,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store14.id,
    },
    {
      name: "Café con Leche",
      price: 2200,
      referenceCode: "CAF1-002",
      lowStockThreshold: 20,
      currentStock: 80,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1572286258217-215a8c2c8a9d?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store14.id,
    },
    {
      name: "Empanada de Pollo",
      price: 2500,
      referenceCode: "CAF1-003",
      lowStockThreshold: 15,
      currentStock: 40,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store14.id,
    },
    {
      name: "Pan de Bono",
      price: 1800,
      referenceCode: "CAF1-004",
      lowStockThreshold: 15,
      currentStock: 35,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store14.id,
    },
    {
      name: "Buñuelo",
      price: 1500,
      referenceCode: "CAF1-005",
      lowStockThreshold: 15,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store14.id,
    },
    {
      name: "Jugo Natural de Mora",
      price: 3200,
      referenceCode: "CAF1-006",
      lowStockThreshold: 10,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1622597489926-9d63adc70c9b?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store14.id,
    },

    // ─── Cafetería Doña Inés ─────────────────────────────────────────────────
    {
      name: "Capuchino",
      price: 3500,
      referenceCode: "CAF2-001",
      lowStockThreshold: 15,
      currentStock: 50,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store15.id,
    },
    {
      name: "Sandwich Jamón y Queso",
      price: 6500,
      referenceCode: "CAF2-002",
      lowStockThreshold: 10,
      currentStock: 25,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store15.id,
    },
    {
      name: "Almojábana",
      price: 1800,
      referenceCode: "CAF2-003",
      lowStockThreshold: 15,
      currentStock: 30,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store15.id,
    },
    {
      name: "Croissant",
      price: 4200,
      referenceCode: "CAF2-004",
      lowStockThreshold: 10,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store15.id,
    },
    {
      name: "Café Americano",
      price: 2800,
      referenceCode: "CAF2-005",
      lowStockThreshold: 15,
      currentStock: 45,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store15.id,
    },
    {
      name: "Avena Caliente",
      price: 3000,
      referenceCode: "CAF2-006",
      lowStockThreshold: 10,
      currentStock: 20,
      status: "Active",
      photo:
        "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=400&q=80",
      productCategoryId: catCafeteria.id,
      unitOfMeasureId: uomUnidad.id,
      storeId: store15.id,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`✅ Products seeded — ${products.length} productos creados`);
}
