import { FaqTopic, BranchInfo, ProductItem } from '../types';

export const VIETINBANK_BRAND = {
  logoUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Logo%20VietinBank.png',
  canThoLogoUrl: 'https://raw.githubusercontent.com/cuthaochi/anhCX_CNCT/main/Logo%20CN%20Can%20Tho.jpg',
  brandName: 'VietinBank',
  fullName: 'Ngân hàng TMCP Công Thương Việt Nam',
  hotline247: '1900 558 868',
  consultant: {
    name: 'Trần Hoàng Trung',
    title: 'Chuyên viên tư vấn',
    phone: '0973.874.232',
    phoneFormatted: '0973 874 232',
  },
  operatingHours: {
    weekday: 'Thứ 2 đến Thứ 6: 07:30 - 11:30 | 13:00 - 16:30',
    weekend: 'Thứ 7 - Chủ nhật: Nghỉ giao dịch',
  },
};

export const FAQ_TOPICS: FaqTopic[] = [
  {
    id: 'forgot-password',
    title: '1. Hướng dẫn quên mật khẩu Ipay',
    shortDesc: 'Khôi phục lại mật khẩu truy cập ứng dụng VietinBank iPay nhanh chóng chỉ với 6 bước.',
    iconName: 'KeyRound',
    videoUrl: 'https://www.youtube.com/watch?v=86r0pxPOzbs',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Chọn Quên mật khẩu',
        description: 'Ở màn hình đăng nhập ứng dụng VietinBank iPay, bấm chọn mục "Quên mật khẩu".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.1.png',
      },
      {
        step: 2,
        title: 'Bước 2: Nhập thông tin đăng ký',
        description: 'Nhập tên đăng nhập và số điện thoại đã đăng ký dịch vụ, sau đó bấm "Tiếp tục".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.2.png',
      },
      {
        step: 3,
        title: 'Bước 3: Nhập mã OTP',
        description: 'Nhập mã xác thực OTP được gửi về tin nhắn SMS của Quý khách, sau đó bấm "Tiếp tục".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.3.png',
      },
      {
        step: 4,
        title: 'Bước 4: Xác thực khuôn mặt',
        description: 'Xác thực khuôn mặt theo yêu cầu trên màn hình. Sau khi hoàn thành, iPay sẽ gửi mật khẩu mới về tin nhắn SMS. Bấm "Đăng nhập iPay" để tiếp tục.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.4.png',
      },
      {
        step: 5,
        title: 'Bước 5: Nhập mật khẩu mới',
        description: 'Mật khẩu hiện tại: Nhập theo mật khẩu được gửi về tin nhắn SMS. Mật khẩu mới: Là mật khẩu Quý khách muốn đổi. Bấm "Tiếp tục".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.5.png',
      },
      {
        step: 6,
        title: 'Bước 6: Hoàn tất đổi mật khẩu',
        description: 'Thực hiện quét khuôn mặt theo hướng dẫn để xác nhận đổi mật khẩu thành công.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/1.6.png',
      },
    ],
  },
  {
    id: 'close-card',
    title: '2. Hướng dẫn đóng thẻ',
    shortDesc: 'Khóa hoặc đóng thẻ ATM, thẻ ghi nợ hoặc tín dụng an toàn trực tiếp trên ứng dụng.',
    iconName: 'CreditCard',
    videoUrl: 'https://www.youtube.com/watch?v=acdT3KxET40',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Đăng nhập iPay',
        description: 'Đăng nhập vào ứng dụng VietinBank iPay bằng tài khoản của Quý khách.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.1.png',
      },
      {
        step: 2,
        title: 'Bước 2: Danh sách thẻ',
        description: 'Tại màn hình chính, vào mục "Quản lý thẻ" hoặc "Danh sách thẻ".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.2.png',
      },
      {
        step: 3,
        title: 'Bước 3: Chọn thẻ cần đóng',
        description: 'Xem đúng thẻ cần đóng, bấm vào phần "Xem thêm" hoặc cài đặt của thẻ đó.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.3.png',
      },
      {
        step: 4,
        title: 'Bước 4: Chọn đóng thẻ',
        description: 'Chọn chức năng "Đóng thẻ" / "Khóa thẻ vĩnh viễn" theo danh mục hiển thị.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.4.png',
      },
      {
        step: 5,
        title: 'Bước 5: Nhập mã OTP',
        description: 'Kiểm tra kỹ thông tin thẻ và nhập mã xác thực OTP gửi về điện thoại.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.5.png',
      },
      {
        step: 6,
        title: 'Bước 6: Xác nhận hoàn tất',
        description: 'Xác nhận OTP thành công, hệ thống thông báo trạng thái thẻ đã được đóng an toàn.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/2.6.png',
      },
    ],
  },
  {
    id: 'verify-cccd',
    title: '3. Xác thực CCCD gắn chip',
    shortDesc: 'Hướng dẫn chuẩn bị và đọc dữ liệu chip NFC trên CCCD theo chuẩn quy định Quyết định 2345/QĐ-NHNN.',
    iconName: 'ShieldCheck',
    videoUrl: 'https://www.youtube.com/watch?v=9yYn3SbMT9A',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Chuẩn bị CCCD gắn chip',
        description: 'Chuẩn bị Căn cước công dân gắn chip bản gốc, còn hiệu lực và điện thoại có hỗ trợ tính năng NFC (bật NFC trong cài đặt).',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.1.png',
      },
      {
        step: 2,
        title: 'Bước 2: Mở mục Cập nhật CCCD',
        description: 'Đăng nhập VietinBank iPay > Chọn ảnh đại diện > Chọn "Cập nhật sinh trắc học / CCCD gắn chip".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.2.png',
      },
      {
        step: 3,
        title: 'Bước 3: Chụp mặt trước CCCD',
        description: 'Đặt mặt trước CCCD vào khung hình, đảm bảo ánh sáng rõ, không bị lóa hoặc mất góc.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.3.png',
      },
      {
        step: 4,
        title: 'Bước 4: Chụp mặt sau CCCD',
        description: 'Chụp rõ nét mặt sau CCCD gắn chip bao gồm dải mã vạch quét máy.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.4.png',
      },
      {
        step: 5,
        title: 'Bước 5: Áp chip CCCD vào vị trí đầu đọc NFC',
        description: 'Đặt mặt trước thẻ CCCD sát vào mặt lưng điện thoại (vùng anten NFC: gần cụm camera với iPhone, giữa hoặc trên lưng máy với Android) và giữ yên 3-5 giây cho đến khi máy rung báo đọc thành công.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.7.png',
      },
    ],
  },
  {
    id: 'biometric-update',
    title: '4. Hướng dẫn cập nhật sinh trắc học',
    shortDesc: 'Cập nhật khuôn mặt và dữ liệu sinh trắc học để đảm bảo giao dịch chuyển khoản trên 10 triệu đồng không bị gián đoạn.',
    iconName: 'ScanFace',
    videoUrl: 'https://www.youtube.com/watch?v=9yYn3SbMT9A',
    steps: [
      {
        step: 1,
        title: 'Bước 1: Đăng nhập VietinBank iPay',
        description: 'Mở ứng dụng VietinBank iPay trên điện thoại di động và đăng nhập tài khoản.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.1.png',
      },
      {
        step: 2,
        title: 'Bước 2: Bấm Bắt đầu chụp',
        description: 'Vào tính năng "Cập nhật khuôn mặt" và nhấp nút "Bắt đầu chụp".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.2.png',
      },
      {
        step: 3,
        title: 'Bước 3: Chụp mặt trước CCCD',
        description: 'Chụp hình mặt trước căn cước công dân gắn chip rõ nét trong khung hình chỉ dẫn.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.3.png',
      },
      {
        step: 4,
        title: 'Bước 4: Chụp mặt sau CCCD',
        description: 'Chụp hình mặt sau căn cước công dân gắn chip để hệ thống nhận diện số MRZ.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.4.png',
      },
      {
        step: 5,
        title: 'Bước 5: Xác nhận hướng dẫn',
        description: 'Đọc kỹ thông tin hướng dẫn và nhấp vào nút "Đã hiểu".',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.5.png',
      },
      {
        step: 6,
        title: 'Bước 6: Đưa gương mặt vào khung hình',
        description: 'Đưa gương mặt vào vòng tròn camera, không đeo kính râm, khẩu trang và làm theo lệnh chớp mắt, nghiêng đầu.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.6.png',
      },
      {
        step: 7,
        title: 'Bước 7: Đọc chip NFC CCCD',
        description: 'Đặt mặt trước CCCD ngay mặt sau điện thoại để thiết bị tự động đọc chip NFC an toàn.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.7.png',
      },
      {
        step: 8,
        title: 'Bước 8: Hoàn tất cập nhật',
        description: 'Bấm "Tiếp tục" để hệ thống đối chiếu dữ liệu với Bộ Công An và lưu hồ sơ sinh trắc học thành công.',
        imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/3.8.png',
      },
    ],
  },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'prod-household',
    name: 'Mở tài khoản hộ kinh doanh',
    category: 'household',
    categoryLabel: 'Hộ kinh doanh',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/M%E1%BB%9F%20t%C3%A0i%20kho%E1%BA%A3n%20h%E1%BB%99%20kinh%20doanh.png',
    highlightText: 'Gói giải pháp tài chính toàn diện dành riêng cho chủ hộ kinh doanh, miễn phí mở tài khoản số đẹp, phí chuyển khoản 0đ và tặng bộ mã QR thanh toán.',
    benefits: [
      'Miễn phí tài khoản số đẹp theo ngày sinh, phong thủy',
      'Miễn phí 100% phí chuyển khoản trong & ngoài hệ thống',
      'Trang bị bộ QR trưng bày cửa hàng chuyên nghiệp',
      'Hạn mức vay vốn kinh doanh ưu đãi đến 3 tỷ đồng'
    ],
  },
  {
    id: 'prod-pos-cash',
    name: 'Chạm POS rút tiền mặt',
    category: 'personal',
    categoryLabel: 'Khách hàng cá nhân',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Ch%E1%BA%A1m%20POS%20r%C3%BAt%20ti%E1%BB%81n.png',
    highlightText: 'Trải nghiệm rút tiền không cần thẻ vật lý qua máy POS VietinBank thông minh, nhanh gọn, bảo mật cao và tiện lợi mọi lúc mọi nơi.',
    benefits: [
      'Rút tiền mặt tiện ích không cần cầm thẻ cứng',
      'Thao tác chạm Contactless một chạm bảo mật',
      'Mạng lưới POS rộng khắp siêu thị, cửa hàng tiện lợi',
      'Chi phí giao dịch minh bạch, ưu đãi'
    ],
  },
  {
    id: 'prod-enterprise-collection',
    name: 'Sản phẩm thu hộ KHDN',
    category: 'enterprise',
    categoryLabel: 'Khách hàng doanh nghiệp',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Thu%20h%E1%BB%99%20KHDN.png',
    highlightText: 'Giải pháp thu hộ dòng tiền bán hàng tự động cho doanh nghiệp qua VietinBank eFAST, kết nối API ERP thời gian thực, quản lý đối soát dễ dàng.',
    benefits: [
      'Gạch nợ tức thời theo thời gian thực (Real-time)',
      'Tích hợp đa kênh: Quầy, iPay, Virtual Account, POS',
      'Báo cáo đối soát doanh thu chi tiết, tự động hóa kế toán',
      'Tối ưu hóa vòng quay vốn lưu động cho doanh nghiệp'
    ],
  },
  {
    id: 'prod-auction-assets',
    name: 'Bán đấu giá tài sản bảo đảm',
    category: 'auction',
    categoryLabel: 'Thông tin bán đấu giá TSBĐ',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/T%C3%A0i%20s%E1%BA%A3n%20b%E1%BA%A3o%20%C4%91%E1%BA%A3m%201.jpg',
    highlightText: 'Danh mục tài sản bất động sản, nhà đất, phương tiện vận tải và dự án được VietinBank xử lý bán đấu giá công khai, pháp lý minh bạch, giá hấp dẫn.',
    benefits: [
      'Pháp lý đầy đủ, sổ đỏ/hồng rõ ràng và minh bạch',
      'Giá khởi điểm cạnh tranh so với thị trường',
      'Hỗ trợ gói vay mua tài sản phát mại với lãi suất ưu đãi',
      'Thủ tục chuyển nhượng nhanh chóng, an toàn'
    ],
  },
  {
    id: 'prod-promo-credit-card',
    name: 'Gói tài khoản i-Zero & Thẻ Eliv3',
    category: 'promo',
    categoryLabel: 'Ưu đãi đang triển khai',
    imageUrl: 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Ch%E1%BA%A1m%20POS%20r%C3%BAt%20ti%E1%BB%81n.png',
    highlightText: 'Ưu đãi hoàn tiền đến 10% chi tiêu ẩm thực, du lịch, giải trí; miễn phí trọn đời phí quản lý tài khoản và duy trì dịch vụ iPay.',
    benefits: [
      'Hoàn tiền đến 1.200.000đ/tháng chi tiêu thẻ Eliv3',
      'Miễn phí chuyển khoản 24/7 không giới hạn số lần',
      'Tích điểm VietinBank Loyalty đổi ngàn quà tặng',
      'Tặng bảo hiểm du lịch toàn cầu trị giá tới 10 tỷ'
    ],
  },
];

export const BRANCHES_DATA: BranchInfo[] = [
  {
    id: 'kcn-trang-bang',
    name: 'KCN Trảng Bàng',
    region: 'Tây Ninh',
    hotline: '0276.3896389',
    offices: [
      {
        id: 'tb-hoiso',
        stt: 1,
        name: 'CN KCN Trảng Bàng (Trụ sở)',
        address: '1564A1, Quốc lộ 22, Khu phố An Bình, Phường An Tịnh, Thị xã Trảng Bàng, Tỉnh Tây Ninh',
        phone: '0276.3896389',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/Hoi-so.jfif',
        googleMapsUrl: 'https://maps.app.goo.gl/esjTuKpymixS23Xn9',
      },
      {
        id: 'tb-phuocdong',
        stt: 2,
        name: 'PGD Phước Đông - CN KCN Trảng Bàng',
        address: 'Số 42, Khu phố Phước Đức B, Phường Gia Lộc, Thị xã Trảng Bàng, Tỉnh Tây Ninh',
        phone: '0276.3534252',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/PGD-Phuoc-Dong.jfif',
        googleMapsUrl: 'https://maps.app.goo.gl/pJ72JQHagVdXZdEH8',
      },
      {
        id: 'tb-phuoctrach',
        stt: 3,
        name: 'PGD Phước Trạch - CN KCN Trảng Bàng',
        address: 'Số 147, Ấp Bàu Vừng, Xã Phước Thạnh, Huyện Gò Dầu, Tỉnh Tây Ninh',
        phone: '0276.3896389',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/PGD-Phuoc-Trach.jfif',
        googleMapsUrl: 'https://maps.app.goo.gl/RHestArPMTbmZ3B7A',
      },
      {
        id: 'tb-trangbang',
        stt: 4,
        name: 'PGD Trảng Bàng - CN KCN Trảng Bàng',
        address: 'Số 236, QL22, Khu phố Lộc Du, Phường Trảng Bàng, Thị xã Trảng Bàng, Tỉnh Tây Ninh',
        phone: '0276.3880144',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/PGD-Trang-Bang.jfif',
        googleMapsUrl: 'https://maps.app.goo.gl/skkUhLc3XBNnEqsu7',
      },
    ],
  },
  {
    id: 'can-tho',
    name: 'Cần Thơ',
    region: 'TP. Cần Thơ',
    logoUrl: 'https://raw.githubusercontent.com/cuthaochi/anhCX_CNCT/main/Logo%20CN%20Can%20Tho.jpg',
    hotline: '0292.3820387',
    offices: [
      {
        id: 'ct-hoiso',
        stt: 1,
        name: 'Chi nhánh Cần Thơ (Trụ sở)',
        address: 'Số 9 Phan Đình Phùng, Phường Tân An, Quận Ninh Kiều, Thành phố Cần Thơ',
        phone: '0292.3820387',
        photoUrl: 'https://raw.githubusercontent.com/cuthaochi/anhCX_CNCT/main/Logo%20CN%20Can%20Tho.jpg',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Can+Tho+9+Phan+Dinh+Phung',
      },
      {
        id: 'ct-ninhkieu',
        stt: 2,
        name: 'PGD Ninh Kiều - CN Cần Thơ',
        address: '132C Nguyễn Thái Học, Phường Tân An, Quận Ninh Kiều, TP. Cần Thơ',
        phone: '0292.3813955',
        photoUrl: 'https://raw.githubusercontent.com/cuthaochi/anhCX_CNCT/main/Logo%20CN%20Can%20Tho.jpg',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Ninh+Kieu+Can+Tho',
      },
      {
        id: 'ct-binhthuy',
        stt: 3,
        name: 'PGD Bình Thủy - CN Cần Thơ',
        address: 'Số 512 Cách Mạng Tháng 8, Phường Bùi Hữu Nghĩa, Quận Bình Thủy, TP. Cần Thơ',
        phone: '0292.3884179',
        photoUrl: 'https://raw.githubusercontent.com/cuthaochi/anhCX_CNCT/main/Logo%20CN%20Can%20Tho.jpg',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Binh+Thuy+Can+Tho',
      },
      {
        id: 'ct-cairang',
        stt: 4,
        name: 'PGD Cái Răng - CN Cần Thơ',
        address: 'Số 110 Quốc lộ 1A, Phường Lê Bình, Quận Cái Răng, TP. Cần Thơ',
        phone: '0292.3861245',
        photoUrl: 'https://raw.githubusercontent.com/cuthaochi/anhCX_CNCT/main/Logo%20CN%20Can%20Tho.jpg',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Cai+Rang+Can+Tho',
      },
    ],
  },
  {
    id: 'bac-da-nang',
    name: 'Bắc Đà Nẵng',
    region: 'Đà Nẵng',
    hotline: '0236.3732668',
    offices: [
      {
        id: 'bdn-hoiso',
        stt: 1,
        name: 'CN Bắc Đà Nẵng (Trụ sở)',
        address: 'Số 338 Tôn Đức Thắng, Phường Hòa Minh, Quận Liên Chiểu, TP. Đà Nẵng',
        phone: '0236.3732668',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/Hoi-so.jfif',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Bac+Da+Nang',
      },
      {
        id: 'bdn-hoakhanh',
        stt: 2,
        name: 'PGD Hòa Khánh - CN Bắc Đà Nẵng',
        address: 'Lô 14 Đường Nguyễn Lương Bằng, Phường Hòa Khánh Bắc, Quận Liên Chiểu, Đà Nẵng',
        phone: '0236.3730888',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/PGD-Phuoc-Dong.jfif',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Hoa+Khanh+Da+Nang',
      },
    ],
  },
  {
    id: 'hoi-an',
    name: 'Hội An',
    region: 'Quảng Nam',
    hotline: '0235.3917888',
    offices: [
      {
        id: 'ha-hoiso',
        stt: 1,
        name: 'CN Hội An (Trụ sở)',
        address: 'Số 117 Trần Hưng Đạo, Phường Cẩm Phô, TP. Hội An, Tỉnh Quảng Nam',
        phone: '0235.3917888',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/Hoi-so.jfif',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Hoi+An',
      },
      {
        id: 'ha-camchau',
        stt: 2,
        name: 'PGD Cẩm Châu - CN Hội An',
        address: 'Số 384 Cửa Đại, Phường Cẩm Châu, TP. Hội An, Quảng Nam',
        phone: '0235.3923456',
        photoUrl: 'https://raw.githubusercontent.com/giadinhbanker/File_anh/refs/heads/main/PGD-Trang-Bang.jfif',
        googleMapsUrl: 'https://maps.google.com/?q=VietinBank+Cam+Chau+Hoi+An',
      },
    ],
  },
];

export const DEPOSIT_TERM_RATES: Record<number, number> = {
  1: 2.0,
  2: 2.0,
  3: 2.3,
  6: 3.3,
  9: 3.3,
  12: 4.8,
  13: 4.8,
  18: 4.9,
  24: 5.0,
  36: 5.0,
};

export const DEPOSIT_TIKTOK_URL = 'https://www.tiktok.com/@nguyentrangtkneu/video/7202579533806062875?is_from_webapp=1&sender_device=pc&web_id=7603681770291086866';

export const IPAY_DOWNLOAD_LINKS = {
  ios: 'https://apps.apple.com/vn/app/vietinbank-ipay/id689963454?l=vi',
  android: 'https://play.google.com/store/apps/details?id=com.vietinbank.ipay',
};
