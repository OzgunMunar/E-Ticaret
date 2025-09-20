export interface NavigationModel {
    title: string,
    url: string,
    icon: string
}

export const navigations: NavigationModel[] = [

    {
        title: "Ana Sayfa",
        url: "/",
        icon: "home"
    },
    {
        title: "Urunler",
        url: "/products",
        icon: "box"
    },
    {
        title: "Kategoriler",
        url: "/categories",
        icon: "category"
    }

]