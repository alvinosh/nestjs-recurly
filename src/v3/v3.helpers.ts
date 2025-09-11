import { RecurlyConfigDto } from '@config/config.dto'
import { Logger } from '@nestjs/common'
import { RECURLY_API_BASE_URL, RECURLY_API_EU_BASE_URL } from './v3.constants'
import { RecurlyAPILocation } from './v3.types'

export function getHeaders(config: RecurlyConfigDto, key?: string): Record<string, string> {
	const apiKey = key || config.RECURLY_API_KEY
	if (!apiKey) {
		throw new Error('RECURLY_API_KEY is required')
	}

	const auth = Buffer.from(`${apiKey}:`).toString('base64')

	return {
		Authorization: `Basic ${auth}`,
		Accept: 'application/vnd.recurly.v2021-02-25',
		'Content-Type': 'application/json',
		'Accept-Language': config.RECURLY_ACCEPT_LANGUAGE || 'en-US',
	}
}

export function getBaseUrl(config: RecurlyConfigDto, apiLocation?: RecurlyAPILocation): string {

	let location = RecurlyAPILocation.us

	if(apiLocation){
		location = apiLocation
	}else if(config.RECURLY_API_LOCATION){
		location = config.RECURLY_API_LOCATION
	}
	
	switch(location){
		case RecurlyAPILocation.eu:
			return RECURLY_API_EU_BASE_URL
		case RecurlyAPILocation.us:
		default:
			return RECURLY_API_BASE_URL
	}
}

export async function checkResponseIsOk(response: Response, logger: Logger, message: string): Promise<void> {
	if (!response.ok) {
		const errorText = await response.text()
		logger.error(`${message} failed: ${response.status} - ${errorText}`)
		throw new Error(`${message} failed: ${response.status}`)
	}
}

export function buildQueryString(params: Record<string, any>): string {
	const searchParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			if (Array.isArray(value)) {
				searchParams.append(key, value.join(','))
			} else {
				searchParams.append(key, String(value))
			}
		}
	})

	return searchParams.toString()
}

export function canTest() {
	return !(process.env.NODE_ENV === 'production')
}

export async function suppressErrorTesting(
	service: any,
	fn: (...args: any[]) => Promise<any>,
	...args: any[]
): Promise<void> {
	// Temporarily suppress logger error for expected 404
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	const loggerSpy = service['logger'] ? jest.spyOn(service['logger'], 'error').mockImplementation() : null

	try {
		await fn(...args)
		fail('Expected function to throw an error')
	} catch (error) {
		expect(error).toBeDefined()
	} finally {
		if (loggerSpy) {
			loggerSpy.mockRestore()
		}
	}
}
