import prisma from "../../prismaClient.js";

export async function seedStores() {
  const userAdmin = await prisma.user.findFirstOrThrow({
    where: { email: "admin@gmail.com" },
  });
  const userGrocer = await prisma.user.findFirstOrThrow({
    where: { email: "grocer@gmail.com" },
  });
  const userCustomer = await prisma.user.findFirstOrThrow({
    where: { email: "customer@gmail.com" },
  });
  const catAbarrotes = await prisma.storeCategory.findFirstOrThrow({
    where: { name: "Tienda de abarrotes" },
  });
  const catFruver = await prisma.storeCategory.findFirstOrThrow({
    where: { name: "Fruver" },
  });
  const catLicorera = await prisma.storeCategory.findFirstOrThrow({
    where: { name: "Licorera" },
  });
  const catFerreteria = await prisma.storeCategory.findFirstOrThrow({
    where: { name: "Ferretería" },
  });
  const catPapeleria = await prisma.storeCategory.findFirstOrThrow({
    where: { name: "Papelería" },
  });
  const catCafeteria = await prisma.storeCategory.findFirstOrThrow({
    where: { name: "Cafetería" },
  });

  const stores = [
    {
      name: "Tienda Don Carlos",
      address: "Calle 10 # 5-23, Cartago",
      neighborhood: "Centro",
      photo:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&q=80",
      longitude: -75.9124,
      latitude: 4.7459,
      description: "Tienda de abarrotes del barrio centro",
      phone: "3101234567",
      status: "Active",
      userId: userAdmin.id,
      storeCategoryId: catAbarrotes.id,
      onboardingStep: "completed",
    },
    {
      name: "Minimercado La Esquina",
      address: "Carrera 8 # 12-45, Cartago",
      neighborhood: "El Jardín",
      photo:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80",
      longitude: -75.92,
      latitude: 4.748,
      description: "Minimercado surtido con productos del hogar",
      phone: "3209876543",
      status: "Active",
      userId: userGrocer.id,
      storeCategoryId: catAbarrotes.id,
      onboardingStep: "completed",
    },
    {
      name: "Tienda Doña Rosa",
      address: "Carrera 5 # 20-14, Cartago",
      neighborhood: "Chapinero",
      photo:
        "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=200&q=80",
      longitude: -75.9105,
      latitude: 4.7502,
      description: "Tienda familiar con productos de primera necesidad",
      phone: "3117778899",
      status: "Active",
      userId: userCustomer.id,
      storeCategoryId: catAbarrotes.id,
      onboardingStep: "completed",
    },
    {
      name: "Fruver El Palmar",
      address: "Calle 22 # 9-31, Cartago",
      neighborhood: "El Palmar",
      photo:
        "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=200&q=80",
      longitude: -75.9088,
      latitude: 4.7521,
      description:
        "Fruver de barrio con frutas y verduras frescas todos los días",
      phone: "3226663344",
      status: "Active",
      userId: userAdmin.id,
      storeCategoryId: catFruver.id,
      onboardingStep: "completed",
    },
    {
      name: "Fruver El Roble",
      address: "Calle 18 # 6-12, Cartago",
      neighborhood: "El Roble",
      photo:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=200&q=80",
      longitude: -75.9132,
      latitude: 4.7445,
      description: "Fruver de barrio con productos naturales y frescos",
      phone: "3134445566",
      status: "Active",
      userId: userGrocer.id,
      storeCategoryId: catFruver.id,
      onboardingStep: "completed",
    },
    {
      name: "Autoservicio San José",
      address: "Carrera 12 # 14-08, Cartago",
      neighborhood: "San José",
      photo:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&q=80",
      longitude: -75.9176,
      latitude: 4.7512,
      description: "Autoservicio de barrio con surtido completo",
      phone: "3145556677",
      status: "Active",
      userId: userCustomer.id,
      storeCategoryId: catAbarrotes.id,
      onboardingStep: "completed",
    },
    {
      name: "Tienda La Economía",
      address: "Calle 9 # 4-50, Cartago",
      neighborhood: "Centro",
      photo:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&q=80",
      longitude: -75.9119,
      latitude: 4.7463,
      description: "Tienda de barrio con precios económicos",
      phone: "3167778899",
      status: "Active",
      userId: userAdmin.id,
      storeCategoryId: catAbarrotes.id,
      onboardingStep: "completed",
    },
    {
      name: "Licorera Los Pinos",
      address: "Carrera 7 # 18-22, Cartago",
      neighborhood: "Los Pinos",
      photo:
        "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=200&q=80",
      longitude: -75.9143,
      latitude: 4.7535,
      description: "Licorera de barrio con licores nacionales e importados",
      phone: "3178889900",
      status: "Active",
      userId: userGrocer.id,
      storeCategoryId: catLicorera.id,
      onboardingStep: "completed",
    },
    {
      name: "Licorera Don Pedro",
      address: "Calle 25 # 7-19, Cartago",
      neighborhood: "Venecia",
      photo:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=200&q=80",
      longitude: -75.9097,
      latitude: 4.7488,
      description: "Licorera tradicional del barrio Venecia",
      phone: "3189990011",
      status: "Active",
      userId: userCustomer.id,
      storeCategoryId: catLicorera.id,
      onboardingStep: "completed",
    },
    {
      name: "Ferretería La Fortuna",
      address: "Carrera 4 # 22-30, Cartago",
      neighborhood: "La Fortuna",
      photo:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&q=80",
      longitude: -75.9162,
      latitude: 4.7551,
      description:
        "Ferretería de barrio con herramientas y materiales de construcción",
      phone: "3191112233",
      status: "Active",
      userId: userAdmin.id,
      storeCategoryId: catFerreteria.id,
      onboardingStep: "completed",
    },
    {
      name: "Ferretería La Bendición",
      address: "Calle 14 # 11-05, Cartago",
      neighborhood: "El Jardín",
      photo:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&q=80",
      longitude: -75.9211,
      latitude: 4.7475,
      description: "Ferretería de barrio surtida con insumos esenciales",
      phone: "3202223344",
      status: "Active",
      userId: userGrocer.id,
      storeCategoryId: catFerreteria.id,
      onboardingStep: "completed",
    },
    {
      name: "Papelería El Carmelo",
      address: "Carrera 9 # 16-40, Cartago",
      neighborhood: "El Carmelo",
      photo:
        "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=200&q=80",
      longitude: -75.9085,
      latitude: 4.7497,
      description: "Papelería de barrio con útiles escolares y de oficina",
      phone: "3213334455",
      status: "Active",
      userId: userCustomer.id,
      storeCategoryId: catPapeleria.id,
      onboardingStep: "completed",
    },
    {
      name: "Papelería El Buen Precio",
      address: "Calle 30 # 8-15, Cartago",
      neighborhood: "Chapinero",
      photo:
        "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=200&q=80",
      longitude: -75.9099,
      latitude: 4.7518,
      description: "Papelería de barrio con ofertas y promociones",
      phone: "3224445566",
      status: "Active",
      userId: userAdmin.id,
      storeCategoryId: catPapeleria.id,
      onboardingStep: "completed",
    },
    {
      name: "Cafetería La Quinta",
      address: "Carrera 11 # 19-27, Cartago",
      neighborhood: "La Quinta",
      photo:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&q=80",
      longitude: -75.9155,
      latitude: 4.7466,
      description: "Cafetería de barrio con café recién hecho y onces",
      phone: "3235556677",
      status: "Active",
      userId: userGrocer.id,
      storeCategoryId: catCafeteria.id,
      onboardingStep: "completed",
    },
    {
      name: "Cafetería Doña Inés",
      address: "Calle 17 # 13-09, Cartago",
      neighborhood: "San José",
      photo:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
      logo: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200&q=80",
      longitude: -75.9183,
      latitude: 4.7503,
      description: "Cafetería de barrio atendida por la comunidad",
      phone: "3246667788",
      status: "Active",
      userId: userCustomer.id,
      storeCategoryId: catCafeteria.id,
      onboardingStep: "completed",
    },
  ];

  for (const store of stores) {
    await prisma.store.create({ data: store });
  }

  console.log("✅ Stores seeded");
}
