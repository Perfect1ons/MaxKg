export interface IBoughts {
    lastz: IBoughtItem[]
  }
  
  export interface IBoughtItem {
    id: number
    art3: any
    art: number
    cena0: string
    cena4: any
    cena_dos?: string
    cenaok: number
    cena0r: any
    cena4r: any
    cena_dosr: any
    cena_kyrs: any
    naim: string
    url: string
    prim?: string
    img: string
    idt: any
    notfound: number
    id_city: number
    dat1: any
    minQty: number
    isNovelty?: number
    country_id: any
    country: string
    stuff?: string
    size: string
    keep_package: any
    is_paid_delivery: any
    discountPercent: any
    currencySign: string
    supply_period: any
    balance: string
    id_post: number
    id_cat: number
    bazedin: string
    id_cat1c: any
    naim_cat1c: any
    id_idcat: any
    moder: number
    id_tov: number
    copy: any
    weight?: number
    description?: string
    short_description?: string
    trademark?: string
    cert?: string
    pli?: number
    naim_word: any
    img1sm?: string
    img2big?: string
    art_post?: string
    id_user_add: any
    price_cost: string
    price_update?: string
    naim_add: any
    naim_add_manual?: string
    id_user_add_manual?: number
    id_status: string
    video?: string
    pli_update?: string
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
    trademark_id: any
    in_box?: string
    box?: string
    img_url?: string
    status: number
    id_micro_serv?: number
    d_min?: string
    d_max?: string
    percent_sum: string
    update_period: number
    show_price: number
    show_opt: number
    active_img?: number
    active_percent_sum: number
    images: Image[]
    price: number
    before_markup: number
    apply_test_per?: string
    discount: number
    discount_prc: number
    promotions: any[]
    old_price: number
    to_date: number
    from_date: number
    valuteVal: string
    ddos: string
    photos: Photo[]
    ocenka: number
    before_round?: number
    round_test?: string
  }
  
  export interface Image {
    id: number
    id_tov: number
    img: string
    sort: number
    id_post: number
    id_tovv: number
  }
  
  export interface Photo {
    url_part: string
  }
  