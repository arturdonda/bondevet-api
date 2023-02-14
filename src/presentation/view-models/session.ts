import { Page, Session } from '@domain/entities';

export class SessionViewModel {
	private readonly refreshToken: string;
	private readonly ipAddress: string;
	private readonly date: string;
	private readonly browser: string;
	private readonly deviceType: string;
	private readonly countryCode: string;
	private readonly countryName: string;
	private readonly regionCode: string;
	private readonly regionName: string;
	private readonly city: string;

	constructor(params: Session) {
		this.refreshToken = params.refreshToken;
		this.ipAddress = params.metadata.ipAddress;
		this.date = params.metadata.date.toISOString();
		this.browser = params.metadata.browser;
		this.deviceType = params.metadata.deviceType;
		this.countryCode = params.metadata.country.code;
		this.countryName = params.metadata.country.name;
		this.regionCode = params.metadata.region.code;
		this.regionName = params.metadata.region.name;
		this.city = params.metadata.city;
	}

	static map(session: Session): SessionViewModel {
		return new SessionViewModel(session);
	}

	static mapPage(sessionPage: Page<Session>): Page<SessionViewModel> {
		return { ...sessionPage, data: sessionPage.data.map(SessionViewModel.map) };
	}
}
